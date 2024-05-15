
import Order from '../../domain/entity/order';
import OrderItem from '../../domain/entity/orderItem';
import OrderRepositoryInterface from '../../domain/repository/order-repository.interface';
import OrderItemModel from '../db/sequelize/models/order-item.model';
import OrderModel from '../db/sequelize/models/order.model';


export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId
            }))
            
        }, {
            include: [{model: OrderItemModel}]
        })
    }


    async update(entity: Order): Promise<void> {
        const transaction = await OrderModel.sequelize.transaction();
        try{

            await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction
            });
    
            await OrderModel.update({
                customer_id: entity.customerId,
                total: entity.total()
            }, {
                where: { id: entity.id },
                transaction
            })
    
            await OrderItemModel.bulkCreate(entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId,
                order_id: entity.id
            })), {transaction});

            await transaction.commit();

        } catch (error) {
            await transaction.rollback();
            throw new Error("Error updating order");
        }

    }


    async find(id: string): Promise<Order> {
        let orderModel;
        
        try{

            orderModel = await OrderModel.findOne({
                where: { id },
                include: ["items"],
                rejectOnEmpty: true
    
            });
        } catch (error) {
            throw new Error("Order not found");
        }

        
        const items = orderModel.items.map(item => new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity,
        ));

        const order = new Order(orderModel.id, orderModel.customer_id, items);

        return order;

    }

    
    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: ["items"]
        });

        const orders = orderModels.map(orderModel => {
            const items = orderModel.items.map(item => new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity,
            ));
    
            const order = new Order(orderModel.id, orderModel.customer_id, items);
    
            return order;
        });

        return orders;
    }
}