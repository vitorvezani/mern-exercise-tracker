const supertest = require('supertest')
const MongoMemoryServer = require('mongodb-memory-server').default;

let mongoServer
let agent
let appServer

beforeAll(async done => {
  console.log('Initilizing tests')

  try {
    jest.useFakeTimers()
    mongoServer = new MongoMemoryServer()
    process.env.ATLAS_URI = await mongoServer.getUri()
    appServer = require('../server');
    agent = supertest.agent(appServer)
  } catch (error) {
    console.error(error)
    done(error)
  }
  done()
});

afterAll(async done => {
  console.log('Finilizing tests')
  try {
    if (appServer) {
      console.log('Closing appServer')
      
      if(await appServer.close()) {
        console.log("mongoDB stoped")
      } else {
        console.log("Could not stop mongoDB")
      }
    }
    if (mongoServer) {
      console.log('Closing database')
      await mongoServer.stop()
    }
  } catch (error) {
    console.error(error)
    done(error)
  }
  console.log('Finishing off everything')
  done()
});

describe('POST /api/auth/login', function () {
  it('responds with json', async done => {
    await agent
      .post('/api/auth/login')
      .expect('Content-Type', /json/)
      .expect(400)

    done()
  });
});