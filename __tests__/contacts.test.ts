import { app } from ".."
import request from "supertest"

// add all jest-extended matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);



describe("contacts", () => {

    describe("given the contact does not exist", () => {

        it("should return 404", async () => {
            const contactId = 8989;
            
            await request(app)
                .get(`/contacts/${contactId}`)
                .expect(404)
        })
    })

    describe("given the contact exist", () => {

        let contactId = null
        it("should create contact and return new contact (200)", async () => {
            const res = await request(app)
                .post(`/contacts`)
                .send({
                    "workerId": 4,
                    "phone": "Test phone +7 707 757 23 45"
                })
                .expect(200)

            const contactData = res.body
            contactId = res.body.id

            expect(contactData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    phone: expect.any(String),
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

        it("should find contact by id (200)", async () => {
            const res = await request(app)
                .get(`/contacts/${contactId}`)
                .expect(200)

            const contactData = res.body

            expect(contactData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    phone: expect.any(String),
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

        it("should delete contact by id (200)", async () => {
            const res = await request(app)
                .delete(`/contacts/${contactId}`)
                .expect(200)

            await request(app)
                .get(`/contacts/${contactId}`)
                .expect(404)
            
        })
    })

    describe("take contacts", () => {
        it("should return contacts (200)", async () => {
            const res = await request(app)
                .get(`/contacts`)
                .expect(200)

            const contactsData = res.body

            contactsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        phone: expect.any(String),
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


        it("should return contacts in different page (200)", async () => {
            const res = await request(app)
                .get(`/contacts?page=2`)
                .expect(200)

            const contactsData = res.body

            contactsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        phone: expect.any(String),
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