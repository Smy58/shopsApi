import { app } from ".."
import request from "supertest"

// add all jest-extended matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);



describe("clients", () => {

    describe("given the client does not exist", () => {

        it("should return 404", async () => {
            const clientId = 8989;
            
            await request(app)
                .get(`/clients/${clientId}`)
                .expect(404)
        })
    })

    describe("given the client exist", () => {

        let clientId = null
        it("should create client and return new client (200)", async () => {
            const res = await request(app)
                .post(`/clients`)
                .send({
                    "name": "Test Name",
                    "address": "Test Pushkina 14",
                    "phone": "+7 777 234 89 01",
                    "mail": "client@gmail.com"
                })
                .expect(200)

            const clientData = res.body
            clientId = res.body.id

            expect(clientData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    address: expect.any(String),
                    phone: expect.any(String),
                    mail: expect.toBeOneOf([expect.any(String), null])
                })
            )
        })

        it("should find client by id (200)", async () => {
            const res = await request(app)
                .get(`/clients/${clientId}`)
                .expect(200)

            const clientData = res.body

            expect(clientData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    address: expect.any(String),
                    phone: expect.any(String),
                    mail: expect.toBeOneOf([expect.any(String), null])
                })
            )
        })

        it("should delete client by id (200)", async () => {
            const res = await request(app)
                .delete(`/clients/${clientId}`)
                .expect(200)

            await request(app)
                .get(`/clients/${clientId}`)
                .expect(404)
            
        })
    })

    describe("take clients", () => {
        it("should return clients (200)", async () => {
            const res = await request(app)
                .get(`/clients`)
                .expect(200)

            const clientsData = res.body

            clientsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        address: expect.any(String),
                        phone: expect.any(String),
                        mail: expect.toBeOneOf([expect.any(String), null])
                    })
                )
            });
        })


        it("should return clients in different page (200)", async () => {
            const res = await request(app)
                .get(`/clients?page=2`)
                .expect(200)

            const clientsData = res.body

            clientsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        address: expect.any(String),
                        phone: expect.any(String),
                        mail: expect.toBeOneOf([expect.any(String), null])
                    })
                )
            });
        })
    })
    
})