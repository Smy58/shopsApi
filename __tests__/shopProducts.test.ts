import { app } from "../src"
import request from "supertest"

// add all jest-extended matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);



describe("shopProducts", () => {

    describe("given the shopProduct does not exist", () => {

        it("should return 404", async () => {
            const shopProductId = 8989;
            
            await request(app)
                .get(`/shopProducts/${shopProductId}`)
                .expect(404)
        })
    })

    describe("given the shopProduct exist", () => {

        let shopProductId = null
        it("should create shopProduct and return new shopProduct (200)", async () => {
            const res = await request(app)
                .post(`/shopProducts`)
                .send({
                    "shopId": 4,
                    "productId": 25,
                    "cost": 1200
                })
                .expect(200)

            const shopProductData = res.body
            shopProductId = res.body.id

            expect(shopProductData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    shopId: expect.any(Number),
                    cost: expect.any(Number),
                    product: expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        description: expect.any(String),
                        vendorCost: expect.any(Number),
                        image: expect.any(String),
                        group: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String)
                        })
                    })
                })
            )
        })

        it("should find shopProduct by id (200)", async () => {
            const res = await request(app)
                .get(`/shopProducts/${shopProductId}`)
                .expect(200)

            const shopProductData = res.body

            expect(shopProductData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    shopId: expect.any(Number),
                    cost: expect.any(Number),
                    product: expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        description: expect.any(String),
                        vendorCost: expect.any(Number),
                        image: expect.any(String),
                        group: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String)
                        })
                    })
                })
            )
        })

        it("should delete shopProduct by id (200)", async () => {
            const res = await request(app)
                .delete(`/shopProducts/${shopProductId}`)
                .expect(200)

            await request(app)
                .get(`/shopProducts/${shopProductId}`)
                .expect(404)
            
        })
    })

    describe("take shopProducts", () => {
        it("should return shopProducts (200)", async () => {
            const res = await request(app)
                .get(`/shopProducts`)
                .expect(200)

            const shopProductsData = res.body

            shopProductsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        shopId: expect.any(Number),
                        cost: expect.any(Number),
                        product: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            description: expect.any(String),
                            vendorCost: expect.any(Number),
                            image: expect.any(String),
                            group: expect.objectContaining({
                                id: expect.any(Number),
                                name: expect.any(String)
                            })
                        })
                    })
                )
            });
        })


        it("should return shopProducts in different page (200)", async () => {
            const res = await request(app)
                .get(`/shopProducts?page=2`)
                .expect(200)

            const shopProductsData = res.body

            shopProductsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        shopId: expect.any(Number),
                        cost: expect.any(Number),
                        product: expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            description: expect.any(String),
                            vendorCost: expect.any(Number),
                            image: expect.any(String),
                            group: expect.objectContaining({
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