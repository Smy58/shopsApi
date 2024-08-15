import { app } from ".."
import request from "supertest"

// add all jest-extended matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);



describe("groups", () => {

    describe("given the group does not exist", () => {

        it("should return 404", async () => {
            const groupId = 8989;
            
            await request(app)
                .get(`/groups/${groupId}`)
                .expect(404)
        })
    })

    describe("given the group exist", () => {

        let groupId = null
        it("should create group and return new group (200)", async () => {
            const res = await request(app)
                .post(`/groups`)
                .send({
                    "name": "TEST",
                })
                .expect(200)

            const groupData = res.body
            groupId = res.body.id

            expect(groupData).toEqual(
                expect.objectContaining({
                    name: expect.any(String),
                })
            )
        })

        it("should find group by id (200)", async () => {
            const res = await request(app)
                .get(`/groups/${groupId}`)
                .expect(200)

            const groupData = res.body

            expect(groupData).toEqual(
                expect.objectContaining({
                    name: expect.any(String),
                })
            )
        })

        it("should delete group by id (200)", async () => {
            const res = await request(app)
                .delete(`/groups/${groupId}`)
                .expect(200)

            await request(app)
                .get(`/groups/${groupId}`)
                .expect(404)
            
        })
    })

    describe("take groups", () => {
        it("should return groups (200)", async () => {
            const res = await request(app)
                .get(`/groups`)
                .expect(200)

            const groupsData = res.body

            groupsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                    })
                )
            });
        })


        it("should return groups in different page (200)", async () => {
            const res = await request(app)
                .get(`/groups?page=2`)
                .expect(200)

            const groupsData = res.body

            groupsData.forEach(element => {
                expect(element).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                    })
                )
            });
        })
    })
    
})