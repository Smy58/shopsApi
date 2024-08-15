import { app } from ".."
import request from "supertest"

// add all jest-extended matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);



describe("deliveries", () => {

    describe("given the delivery does not exist", () => {

        it("should return 404", async () => {
            const deliveryId = 8989;
            
            await request(app)
                .get(`/deliveries/${deliveryId}`)
                .expect(404)
        })
    })

    describe("given the delivery exist", () => {

        let deliveryId = null
        it("should create delivery and return new delivery (200)", async () => {
            const res = await request(app)
                .post(`/deliveries`)
                .send({
                    "workerId": 4,
                })
                .expect(200)

            const deliveryData = res.body
            deliveryId = res.body.id

            expect(deliveryData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    worker: expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        shopId: expect.any(Number),
                        role: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String)
                        })
                    })
                })
            )
        })

        it("should find delivery by id (200)", async () => {
            const res = await request(app)
                .get(`/deliveries/${deliveryId}`)
                .expect(200)

            const deliveryData = res.body

            expect(deliveryData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    worker: expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        shopId: expect.any(Number),
                        role: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String)
                        })
                    })
                })
            )
        })

        it("should delete delivery by id (200)", async () => {
            const res = await request(app)
                .delete(`/deliveries/${deliveryId}`)
                .expect(200)

            await request(app)
                .get(`/deliveries/${deliveryId}`)
                .expect(404)
            
        })
    })

    describe("take deliveries", () => {
        it("should return deliveries (200)", async () => {
            const res = await request(app)
                .get(`/deliveries`)
                .expect(200)

            const deliveriesData = res.body

            deliveriesData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        worker: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            shopId: expect.any(Number),
                            role: expect.objectContaining({
                                id: expect.any(Number),
                                name: expect.any(String)
                            })
                        })
                    })
                )
            });
        })


        it("should return deliveries in different page (200)", async () => {
            const res = await request(app)
                .get(`/deliveries?page=2`)
                .expect(200)

            const deliveriesData = res.body

            deliveriesData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        worker: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            shopId: expect.any(Number),
                            role: expect.objectContaining({
                                id: expect.any(Number),
                                name: expect.any(String)
                            })
                        })
                    })
                )
            });
        })
    })
    
})