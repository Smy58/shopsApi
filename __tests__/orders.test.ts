import { app } from ".."
import request from "supertest"

// add all jest-extended matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);



describe("orderPositions", () => {

    describe("given the orderPosition does not exist", () => {

        it("should return 404", async () => {
            const orderPositionId = 8989;
            
            await request(app)
                .get(`/orderPositions/${orderPositionId}`)
                .expect(404)
        })
    })

    describe("given the orders does not exist", () => {

        it("should return 404", async () => {
            const orders = 8989;
            
            await request(app)
                .get(`/orderPositions/${orders}`)
                .expect(404)
        })
    })

    describe("given the orders orderPosition exist", () => {

        let orderPositionId = null
        let ordersId = null
        it("should create order and orderPosition and return new orderPosition (200)", async () => {
            const res = await request(app)
                .post(`/orders`)
                .send({
                    "totalCost": 3000,
                    "shopId": 23,
                    "statusId": 3,
                    "deliveryId": 3,
                    "clientId": 3,
                    "positions": [
                        {
                            "positionId": 1,
                            "count": 2
                        },
                        {
                            "positionId": 2,
                            "count": 2
                        },
                        {
                            "positionId": 3,
                            "count": 2
                        }
                    ]
                })
                .expect(200)

            const ordersData = res.body.order
            ordersId = ordersData.id

            expect(ordersData).toEqual(
                expect.objectContaining({
                    totalCost: expect.any(Number),
                    client: expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        address: expect.any(String),
                        phone: expect.any(String),
                        mail: expect.toBeOneOf([expect.any(String), null])
                    }),
                    delivery: expect.objectContaining({
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
                    }),
                    shop: expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        address: expect.any(String),
                        workTimeStart: expect.any(String),
                        workTimeEnd: expect.any(String),
                        waitingTime: expect.any(Number),
                        image: expect.any(String)
                    }),
                    status: expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String)
                    }),
                })
            )

            const orderPositionsData = res.body.positions
            orderPositionId = orderPositionsData[0].id

            orderPositionsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        orderId: expect.any(Number),
                        count: expect.any(Number),
                        position: {
                            id: expect.any(Number),
                            shopId: expect.any(Number),
                            cost: expect.any(Number),
                            product: {
                                id: expect.any(Number),
                                name: expect.any(String),
                                description: expect.any(String),
                                vendorCost: expect.any(Number),
                                image: expect.any(String),
                                group: {
                                    id: expect.any(Number),
                                    name: expect.any(String)
                                }
                            }
                        }
                    })
                )
            })
        })

        it("should find orderPosition by order id (200)", async () => {
            const res = await request(app)
                .get(`/orders/${ordersId}/positions`)
                .expect(200)

            const orderPositionsData = res.body

            orderPositionsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        orderId: expect.any(Number),
                        count: expect.any(Number),
                        position: {
                            id: expect.any(Number),
                            shopId: expect.any(Number),
                            cost: expect.any(Number),
                            product: {
                                id: expect.any(Number),
                                name: expect.any(String),
                                description: expect.any(String),
                                vendorCost: expect.any(Number),
                                image: expect.any(String),
                                group: {
                                    id: expect.any(Number),
                                    name: expect.any(String)
                                }
                            }
                        }
                    })
                )
    
            });

        })

        it("should find orderPosition by id (200)", async () => {
            const res = await request(app)
                .get(`/orderPositions/${orderPositionId}`)
                .expect(200)

            const orderPositionData = res.body

            expect(orderPositionData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    orderId: expect.any(Number),
                    count: expect.any(Number),
                    position: {
                        id: expect.any(Number),
                        shopId: expect.any(Number),
                        cost: expect.any(Number),
                        product: {
                            id: expect.any(Number),
                            name: expect.any(String),
                            description: expect.any(String),
                            vendorCost: expect.any(Number),
                            image: expect.any(String),
                            group: {
                                id: expect.any(Number),
                                name: expect.any(String)
                            }
                        }
                    }
                })
            )

        })

        it("should find order by id (200)", async () => {
            const res = await request(app)
                .get(`/orders/${ordersId}`)
                .expect(200)

            const orederData = res.body

            expect(orederData).toEqual(
                expect.objectContaining({
                    totalCost: expect.any(Number),
                    client: expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        address: expect.any(String),
                        phone: expect.any(String),
                        mail: expect.toBeOneOf([expect.any(String), null])
                    }),
                    delivery: expect.objectContaining({
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
                    }),
                    shop: expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        address: expect.any(String),
                        workTimeStart: expect.any(String),
                        workTimeEnd: expect.any(String),
                        waitingTime: expect.any(Number),
                        image: expect.any(String)
                    }),
                    status: expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String)
                    }),
                })
            )

        })

        it("should delete orderPosition and order by id (200)", async () => {
            await request(app)
                .delete(`/orderPositions/${orderPositionId}`)
                .expect(200)

            await request(app)
                .get(`/orderPositions/${orderPositionId}`)
                .expect(404)

            await request(app)
                .delete(`/orders/${ordersId}`)
                .expect(200)

            await request(app)
                .get(`/orders/${ordersId}`)
                .expect(404)
            
        })
    })

    describe("take orderPositions", () => {
        it("should return orderPositions (200)", async () => {
            const res = await request(app)
                .get(`/orderPositions`)
                .expect(200)

            const orderPositionsData = res.body

            orderPositionsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        orderId: expect.any(Number),
                        count: expect.any(Number),
                        position: {
                            id: expect.any(Number),
                            shopId: expect.any(Number),
                            cost: expect.any(Number),
                            product: {
                                id: expect.any(Number),
                                name: expect.any(String),
                                description: expect.any(String),
                                vendorCost: expect.any(Number),
                                image: expect.any(String),
                                group: {
                                    id: expect.any(Number),
                                    name: expect.any(String)
                                }
                            }
                        }
                    })
                )
    
            });
        })


        it("should return orderPositions in different page (200)", async () => {
            const res = await request(app)
                .get(`/orderPositions?page=2`)
                .expect(200)

            const orderPositionsData = res.body

            orderPositionsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        orderId: expect.any(Number),
                        count: expect.any(Number),
                        position: {
                            id: expect.any(Number),
                            shopId: expect.any(Number),
                            cost: expect.any(Number),
                            product: {
                                id: expect.any(Number),
                                name: expect.any(String),
                                description: expect.any(String),
                                vendorCost: expect.any(Number),
                                image: expect.any(String),
                                group: {
                                    id: expect.any(Number),
                                    name: expect.any(String)
                                }
                            }
                        }
                    })
                )
    
            });
        })

        it("should return orders (200)", async () => {
            const res = await request(app)
                .get(`/orders`)
                .expect(200)

            const ordersData = res.body

            ordersData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        totalCost: expect.any(Number),
                        client: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            address: expect.any(String),
                            phone: expect.any(String),
                            mail: expect.toBeOneOf([expect.any(String), null])
                        }),
                        delivery: expect.objectContaining({
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
                        }),
                        shop: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            address: expect.any(String),
                            workTimeStart: expect.any(String),
                            workTimeEnd: expect.any(String),
                            waitingTime: expect.any(Number),
                            image: expect.any(String)
                        }),
                        status: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String)
                        }),
                    })
                )
    
            });
        })

        it("should return orderPositions in different page (200)", async () => {
            const res = await request(app)
                .get(`/orders?page=2`)
                .expect(200)

            const ordersData = res.body

            ordersData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        totalCost: expect.any(Number),
                        client: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            address: expect.any(String),
                            phone: expect.any(String),
                            mail: expect.toBeOneOf([expect.any(String), null])
                        }),
                        delivery: expect.objectContaining({
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
                        }),
                        shop: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            address: expect.any(String),
                            workTimeStart: expect.any(String),
                            workTimeEnd: expect.any(String),
                            waitingTime: expect.any(Number),
                            image: expect.any(String)
                        }),
                        status: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String)
                        }),
                    })
                )
    
            });
        })
    })
    
})