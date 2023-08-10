import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication  } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';


describe('auth resolvers (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule , 
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async ()=>{
    await app.close()
  })

  describe('register' , ()=>{
    it('must register' , async ()=>{

      const mutataion = `  
        mutation register ($registerInput: RegisterInput!) {
            register (registerInput: $registerInput) {
                access_token
                roles
            }
        }
      `

      const variables = {
        register: {
            email : "test@gmail.com" , 
            firstName : "test" , 
            lastName : "test" , 
            password : "123456!" , 
        }
      }

      return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query : mutataion ,
        variables
      })
      .expect(200)
      .expect(({ body }) => {
        const auth = body.data;
        expect(auth.length).toBeGreaterThan(0);
      });
    })

    it('must login' , async()=>{

      const mutation = `mutation login ($loginInput: LoginInput!) {
        login (loginInput: $loginInput) {
            access_token
            roles
        }
    }`

      const variables = {
        createIssueInput: {
            email : 'test@gmail.com' , 
            password : "123456!" , 
        }
      }

      return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: mutation , 
        variables 
      })
      .expect(200)
      .expect(({ body }) => {
        const auth = body.data.auth;
        expect(auth.access_token).toBeDefined();
      });
    })


    it('must invalid email' , async ()=>{
        const mutation = `mutation login ($loginInput: LoginInput!) {
            login (loginInput: $loginInput) {
                access_token
                roles
            }
        }`
    
        const variables = {
        createIssueInput: {
            email : 'testtest@gmail.com' , 
            password : "123456!" , 
        }
        }
    
          return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: mutation , 
            variables 
          })
          .expect(400)
    })

    it('must invalid password' , async ()=>{
        const mutation = `mutation login ($loginInput: LoginInput!) {
            login (loginInput: $loginInput) {
                access_token
                roles
            }
        }`
    
        const variables = {
        createIssueInput: {
            email : 'test@gmail.com' , 
            password : "12345" , 
        }
        }
    
          return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: mutation , 
            variables 
          })
          .expect(400)
    })
  })
})