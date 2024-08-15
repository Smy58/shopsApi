import { app } from "../src"
import request from "supertest"

// add all jest-extended matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);



describe("roles", () => {

    describe("given the role does not exist", () => {

        it("should return 404", async () => {
            const roleId = 8989;
            
            await request(app)
                .get(`/roles/${roleId}`)
                .expect(404)
        })
    })

    describe("given the role exist", () => {

        let roleId = null
        it("should create role and return new role (200)", async () => {
            const res = await request(app)
                .post(`/roles`)
                .send({
                    "name": "Tester"
                })
                .expect(200)

            const roleData = res.body
            roleId = res.body.id

            expect(roleData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String)
                })
            )
        })

        it("should find role by id (200)", async () => {
            const res = await request(app)
                .get(`/roles/${roleId}`)
                .expect(200)

            const roleData = res.body

            expect(roleData).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String)
                })
            )
        })

        it("should delete role by id (200)", async () => {
            const res = await request(app)
                .delete(`/roles/${roleId}`)
                .expect(200)

            await request(app)
                .get(`/roles/${roleId}`)
                .expect(404)
            
        })
    })

    describe("take roles", () => {
        it("should return roles (200)", async () => {
            const res = await request(app)
                .get(`/roles`)
                .expect(200)

            const rolesData = res.body

            rolesData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String)
                    })
                )
            });
        })


        it("should return roles in different page (200)", async () => {
            const res = await request(app)
                .get(`/roles?page=2`)
                .expect(200)

            const rolesData = res.body

            rolesData.forEach(element => {
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