import { app } from ".."
import request from "supertest"

// add all jest-extended matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);



describe("products", () => {

    describe("given the product does not exist", () => {

        it("should return 404", async () => {
            const productId = 8989;
            
            await request(app)
                .get(`/products/${productId}`)
                .expect(404)
        })
    })

    describe("given the product exist", () => {

        let productId = null
        it("should create product and return new product (200)", async () => {
            const res = await request(app)
                .post(`/products`)
                .send({
                    "name": "Test Cheese",
                    "description": "From test kz",
                    "vendorCost": 1200,
                    "image": "some url of image",
                    "groupId": 5
                })
                .expect(200)

            const productData = res.body
            productId = res.body.id

            expect(productData).toEqual(
                expect.objectContaining({
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
            )
        })

        it("should find product by id (200)", async () => {
            const res = await request(app)
                .get(`/products/${productId}`)
                .expect(200)

            const productData = res.body

            expect(productData).toEqual(
                expect.objectContaining({
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
            )
        })

        it("should delete product by id (200)", async () => {
            const res = await request(app)
                .delete(`/products/${productId}`)
                .expect(200)

            await request(app)
                .get(`/products/${productId}`)
                .expect(404)
            
        })
    })

    describe("take products", () => {
        it("should return products (200)", async () => {
            const res = await request(app)
                .get(`/products`)
                .expect(200)

            const productsData = res.body

            productsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
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
                )
            });
        })


        it("should return products in different page (200)", async () => {
            const res = await request(app)
                .get(`/products?page=2`)
                .expect(200)

            const productsData = res.body

            productsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
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
                )
            });
        })
    })
    
})