import { app } from "../src"
import request from "supertest"

// add all jest-extended matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);



describe("statuses", () => {

    describe("given the status does not exist", () => {

        it("should return 404", async () => {
            const statusId = 8989;
            
            await request(app)
                .get(`/statuses/${statusId}`)
                .expect(404)
        })
    })

    describe("given the status exist", () => {

        let statusId = null
        it("should create status and return new status (200)", async () => {
            const res = await request(app)
                .post(`/statuses`)
                .send({
                    "name": "Testing"
                })
                .expect(200)

            const statusData = res.body
            statusId = res.body.id

            expect(statusData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String)
                })
            )
        })

        it("should find status by id (200)", async () => {
            const res = await request(app)
                .get(`/statuses/${statusId}`)
                .expect(200)

            const statusData = res.body

            expect(statusData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String)
                })
            )
        })

        it("should delete status by id (200)", async () => {
            const res = await request(app)
                .delete(`/statuses/${statusId}`)
                .expect(200)

            await request(app)
                .get(`/statuses/${statusId}`)
                .expect(404)
            
        })
    })

    describe("take statuses", () => {
        it("should return statuses (200)", async () => {
            const res = await request(app)
                .get(`/statuses`)
                .expect(200)

            const statusesData = res.body

            statusesData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String)
                    })
                )
            });
        })


        it("should return statuses in different page (200)", async () => {
            const res = await request(app)
                .get(`/statuses?page=2`)
                .expect(200)

            const statusesData = res.body

            statusesData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String)
                    })
                )
            });
        })
    })
    
})