import OracleDB = require("oracledb")

declare namespace ClientParams{
    interface getAll extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        offset: number, 
        maxnumrows: number,
        
    }

    interface create extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        name: string,
        address: string,
        phone: string,
        mail: string,
    }

    interface getById extends Record<string, string | number | bigint | Date | Buffer | null | undefined> { 
        clientId: number 
    }
}

declare namespace ContactsParams{
    interface getAll extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        offset: number, 
        maxnumrows: number,
        workerId?: number
    }

    interface create extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        workerId: number, 
        phone: string
    }

    interface getById extends Record<string, string | number | bigint | Date | Buffer | null | undefined> { 
        contactId: number 
    }
}

declare namespace DeliveriesParams{
    interface getAll extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        offset: number, 
        maxnumrows: number
    }

    interface create extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        workerId: number
    }

    interface getById extends Record<string, string | number | bigint | Date | Buffer | null | undefined> { 
        deliveryId: number 
    }
}

declare namespace GroupsParams{
    interface getAll extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        offset: number, 
        maxnumrows: number
    }

    interface create extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        name: string
    }

    interface getById extends Record<string, string | number | bigint | Date | Buffer | null | undefined> { 
        groupId: number 
    }
}

declare namespace MailsParams{
    interface getAll extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        offset: number, 
        maxnumrows: number,
        workerId?: number
    }

    interface create extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        workerId: number, 
        mail: string
    }

    interface getById extends Record<string, string | number | bigint | Date | Buffer | null | undefined> { 
        mailId: number 
    }
}


declare namespace OrederPositionsParams{
    interface getAll extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        offset: number, 
        maxnumrows: number,
        orderId?: number
    }

    interface create extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        orderId: number,
        positionId: number,
        count: number
    }

    interface getById extends Record<string, string | number | bigint | Date | Buffer | null | undefined> { 
        orderPositionId: number 
    }
}

declare namespace OrdersParams{
    interface getAll extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        offset: number, 
        maxnumrows: number,
        clientId?: number,
        statusId?: number,
    }

    interface create extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        totalCost: number,
        shopId: number,
        statusId: number,
        deliveryId: number,
        clientId: number
    }

    interface getById extends Record<string, string | number | bigint | Date | Buffer | null | undefined> { 
        orderId: number 
    }
}


declare namespace ProductsParams{
    interface getAll extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        offset: number, 
        maxnumrows: number,
        groupId?: number
    }

    interface create extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        name: string, 
        description: string, 
        vendorCost: number,
        image: string,
        groupId: number

    }

    interface getById extends Record<string, string | number | bigint | Date | Buffer | null | undefined> { 
        productId: number 
    }
}

declare namespace RolesParams{
    interface getAll extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        offset: number, 
        maxnumrows: number,
    }

    interface create extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        name: string

    }

    interface getById extends Record<string, string | number | bigint | Date | Buffer | null | undefined> { 
        roleId: number 
    }
}

declare namespace ShopProductsParams{
    interface getAll extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        offset: number, 
        maxnumrows: number,
        shopId?: number
    }

    interface create extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        shopId: number,
        productId: number,
        cost: number
    }

    interface getById extends Record<string, string | number | bigint | Date | Buffer | null | undefined> { 
        shopProductId: number 
    }
}


declare namespace ShopsParams{
    interface getAll extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        offset: number, 
        maxnumrows: number
    }

    interface create extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        name: string, 
        address: string, 
        workTimeStart: string,
        workTimeEnd: string,
        waitingTime: number,
        image: string
    }

    interface getById extends Record<string, string | number | bigint | Date | Buffer | null | undefined> { 
        shopId: number 
    }
}

declare namespace StatusesParams{
    interface getAll extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        offset: number, 
        maxnumrows: number
    }

    interface create extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        name: string
    }

    interface getById extends Record<string, string | number | bigint | Date | Buffer | null | undefined> { 
        statusId: number 
    }
}

declare namespace WorkersParams{
    interface getAll extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        offset: number, 
        maxnumrows: number,
        roleId?: number,
        shopId?: number
    }

    interface create extends Record<string, string | number | bigint | Date | Buffer | null | undefined> {
        name: string,
        shopId: number, 
        roleId: number
    }

    interface getById extends Record<string, string | number | bigint | Date | Buffer | null | undefined> { 
        workerId: number 
    }
}

export {
    ClientParams,
    ContactsParams,
    DeliveriesParams,
    GroupsParams,
    MailsParams,
    OrederPositionsParams,
    OrdersParams,
    ProductsParams,
    RolesParams,
    ShopProductsParams,
    ShopsParams,
    StatusesParams,
    WorkersParams
} 