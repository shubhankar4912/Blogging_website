import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {signupInput,signinInput} from '@devshubhankar/medium-common3'
export const userRoute=new Hono<{   
     Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
}}>();

userRoute.post('/signup', async (c) => {
    const body =await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.text("wrong input field")
    }
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
  }).$extends(withAccelerate())
      
  
    const user=await prisma.user.create({
      data:{
        email:body.email,
        password:body.password
      }
    })
    const token= await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({
      jwt:token,
  
    })
  
  })
  
userRoute.post('/signin', async(c) => {
   const body= await c.req.json();
  const {success}=signinInput.safeParse(body)
  if(!success){
    return c.text("wrong input type")
  }
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
   
    const user=await prisma.user.findFirst(
      {
        where:{
          email:body.email, 
          password:body.password
        }
      }
    )
    if(!user) { 
      c.status(403)
      return c.text("Invalid entry")
    }
  const token= await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({
      jwt:token,
    })
  })