import { app } from "../src"
import request from "supertest"

// add all jest-extended matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);



describe("shops", () => {

    describe("given the shop does not exist", () => {

        it("should return 404", async () => {
            const shopId = 8989;
            
            await request(app)
                .get(`/shops/${shopId}`)
                .expect(404)
        })
    })

    describe("given the shop exist", () => {

        let shopId = null
        it("should create shop and return new shop (200)", async () => {
            const res = await request(app)
                .post(`/shops`)
                .send({
                    "name": "Test Mart",
                    "address": "test Kazybek bi",
                    "workTimeStart": "09:00",
                    "workTimeEnd": "18:00",
                    "waitingTime": 20,
                    "image": "image-url"
                })
                .expect(200)

            const shopData = res.body
            shopId = res.body.id

            expect(shopData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    address: expect.any(String),
                    workTimeStart: expect.any(String),
                    workTimeEnd: expect.any(String),
                    waitingTime: expect.any(Number),
                    image: expect.any(String)
                })
            )
        })

        it("should find shop by id (200)", async () => {
            const res = await request(app)
                .get(`/shops/${shopId}`)
                .expect(200)

            const shopData = res.body

            expect(shopData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    address: expect.any(String),
                    workTimeStart: expect.any(String),
                    workTimeEnd: expect.any(String),
                    waitingTime: expect.any(Number),
                    image: expect.any(String)
                })
            )
        })

        it("should delete shop by id (200)", async () => {
            const res = await request(app)
                .delete(`/shops/${shopId}`)
                .expect(200)

            await request(app)
                .get(`/shops/${shopId}`)
                .expect(404)
            
        })
    })

    describe("take shops", () => {
        it("should return shops (200)", async () => {
            const res = await request(app)
                .get(`/shops`)
                .expect(200)

            const shopsData = res.body

            shopsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        address: expect.any(String),
                        workTimeStart: expect.any(String),
                        workTimeEnd: expect.any(String),
                        waitingTime: expect.any(Number),
                        image: expect.any(String)
                    })
                )
            });
        })


        it("should return shops in different page (200)", async () => {
            const res = await request(app)
                .get(`/shops?page=2`)
                .expect(200)

            const shopsData = res.body

            shopsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        address: expect.any(String),
                        workTimeStart: expect.any(String),
                        workTimeEnd: expect.any(String),
                        waitingTime: expect.any(Number),
                        image: expect.any(String)
                    })
                )
            });
        })
    })
    
})