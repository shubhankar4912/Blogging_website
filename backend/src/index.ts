import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRoute } from './routes/userRoute'
import { blogRoute } from './routes/blogRoute'
type Variables={
  message:string,
}

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }

}>();
app.route('/api/v1/user',userRoute)
app.route('/api/v1/blog',blogRoute)

export default app;
