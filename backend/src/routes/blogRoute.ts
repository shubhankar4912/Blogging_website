import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {createBlogInput,updateBlogInput} from '@devshubhankar/medium-common3'
export const  blogRoute=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
}>();
blogRoute.use("/*",async(c,next)=>{
    const authHeader =c.req.header("Authorization")||"";
    try{
        const user= await verify(authHeader,c.env.JWT_SECRET);
        if(user){
            c.set("userId",user.id)
           await next();
        }
        else{
            return c.json({
                message:"You are not logged in"
            })
        }
       
    }
    catch(e){
        c.status(403)
        return c.text("Your are logged out ")
    }
   

})
//pagination
blogRoute.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs =await prisma.post.findMany();
	return c.json({
        blogs
    })
})
blogRoute.get('/:id',async (c) => {
    const id = c.req.param('id')
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{    
        const blog=await prisma.post.findFirst({
        where:{
            id:id
        },
    })
	return c.json({
        blog
    })}catch(e){
        c.status(411)
        return c.json({
            message:"Error while fetching blog post"
        })
    }


	
})

blogRoute.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const authorId =c.get("userId")
    const body=await c.req.json()
    const {success}=createBlogInput.safeParse(body)
    if(!success){
        return c.text("wrong input")
    }
    const blog=await prisma.post.create({
      data: {
        tilte: body.title,
        content: body.content,
        authorId:authorId
      }

    })
	return c.json({
        id:blog.id
    })
})

blogRoute.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json()
    const {success}=updateBlogInput.safeParse(body)
    if(!success)
        {
            return c.text("wrong input type")
        }
    const blog=await prisma.post.update({
        where:{
            id:body.id
        },
        data: {
        tilte: body.title,
        content: body.content,
      }

    })
	return c.json({
        id:blog.id
    })
	
})
