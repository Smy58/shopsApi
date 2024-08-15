import { app } from "../src"
import request from "supertest"

// add all jest-extended matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);



describe("workers", () => {

    describe("given the worker does not exist", () => {

        it("should return 404", async () => {
            const workerId = 8989;
            
            await request(app)
                .get(`/workers/${workerId}`)
                .expect(404)
        })
    })

    describe("given the worker exist", () => {

        let workerId = null
        it("should create worker and return new worker (200)", async () => {
            const res = await request(app)
                .post(`/workers`)
                .send({
                    "name": "test Boris",
                    "shopId": 2,
                    "roleId": 1
                })
                .expect(200)

            const workerData = res.body
            workerId = res.body.id

            expect(workerData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    shopId: expect.any(Number),
                    role: expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String)
                    })
                })
            )
        })

        it("should find worker by id (200)", async () => {
            const res = await request(app)
                .get(`/workers/${workerId}`)
                .expect(200)

            const workerData = res.body

            expect(workerData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    shopId: expect.any(Number),
                    role: expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String)
                    })
                })
            )
        })

        it("should delete worker by id (200)", async () => {
            const res = await request(app)
                .delete(`/workers/${workerId}`)
                .expect(200)

            await request(app)
                .get(`/workers/${workerId}`)
                .expect(404)
            
        })
    })

    describe("take workers", () => {
        it("should return workers (200)", async () => {
            const res = await request(app)
                .get(`/workers`)
                .expect(200)

            const workersData = res.body

            workersData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        shopId: expect.any(Number),
                        role: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String)
                        })
                    })
                )
            });
        })


        it("should return workers in different page (200)", async () => {
            const res = await request(app)
                .get(`/workers?page=2`)
                .expect(200)

            const workersData = res.body

            workersData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        shopId: expect.any(Number),
                        role: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String)
                        })
                    })
                )
            });
        })
    })
    
})