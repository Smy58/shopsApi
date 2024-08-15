import { app } from ".."
import request from "supertest"

// add all jest-extended matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);



describe("mails", () => {

    describe("given the mail does not exist", () => {

        it("should return 404", async () => {
            const mailId = 8989;
            
            await request(app)
                .get(`/mails/${mailId}`)
                .expect(404)
        })
    })

    describe("given the mail exist", () => {

        let mailId = null
        it("should create mail and return new mail (200)", async () => {
            const res = await request(app)
                .post(`/mails`)
                .send({
                    "workerId": 4,
                    "mail": "Test mail@test.ru"
                })
                .expect(200)

            const mailData = res.body
            mailId = res.body.id

            expect(mailData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    mail: expect.any(String),
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

        it("should find mail by id (200)", async () => {
            const res = await request(app)
                .get(`/mails/${mailId}`)
                .expect(200)

            const mailData = res.body

            expect(mailData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    mail: expect.any(String),
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

        it("should delete mail by id (200)", async () => {
            const res = await request(app)
                .delete(`/mails/${mailId}`)
                .expect(200)

            await request(app)
                .get(`/mails/${mailId}`)
                .expect(404)
            
        })
    })

    describe("take mails", () => {
        it("should return mails (200)", async () => {
            const res = await request(app)
                .get(`/mails`)
                .expect(200)

            const mailsData = res.body

            mailsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        mail: expect.any(String),
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


        it("should return mails in different page (200)", async () => {
            const res = await request(app)
                .get(`/mails?page=2`)
                .expect(200)

            const mailsData = res.body

            mailsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        mail: expect.any(String),
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