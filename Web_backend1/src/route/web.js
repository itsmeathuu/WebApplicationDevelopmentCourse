import express from 'express';
import authCtl from '../controllers/auth.js';
import cartCtl from '../controllers/cart.js';
import productCtl from '../controllers/product.js';
import productImageCtl from '../controllers/product-image.js';
import productReviewCtl from '../controllers/product-review.js';
import soldProductCtl from '../controllers/sold-product.js';
import userCtl from '../controllers/user.js';
import passport from '../middlewares/passport.js';
import upload from '../middlewares/image-upload.js';

const router = express.Router();

/** @index Khởi tạo tất cả đường dẫn */
const initWebRouters = (app) => {

    router.all('*', checkPassport); // Kiểm tra quyền truy cập trước khi xử lý các route

    initPublicRoutes(router); // Khởi tạo đường dẫn công cộng
    initUserRoutes(router); // Khởi tạo đường dẫn dành cho khách hàng (người dùng thông thường)
    initAdminRoutes(router); // Khởi tạo đường dẫn dành cho admin
    initOwnerRoutes(router); // Khởi tạo đường dẫn dành cho owner
    initRegisteredRoutes(router); // Khởi tạo đường dẫn dành cho người dùng đã đăng ký

    app.use('/', router); // Sử dụng router với tất cả các route đã định nghĩa

    // Xử lý các trường hợp không tìm thấy route
    app.use((req, res) => {
        return res.status(404).json({
            path: req.path,
            method: req.method,
            message: 'Path not found'
        });
    });
}

/** Khởi tạo đường dẫn công cộng */
const initPublicRoutes = (parentRouter) => {
    const router = express.Router();

    // Đường dẫn home
    router.get('/', async (req, res) => {
        return res.status(200).json({ message: 'Welcome to Toykingdom Server' })
    });

    // Chức năng cơ bản như đăng nhập, đăng ký
    router.post('/login', authCtl.login);
    router.post('/signup', authCtl.signup);
    router.post('/access/refresh', authCtl.refreshAccessToken);

    // Chức năng tìm kiếm sản phẩm
    router.get('/product/findOne', productCtl.findOne);
    router.get('/product/findAll', productCtl.findAll);

    // Chức năng tìm hình ảnh sản phẩm
    router.get('/product/image/find', productImageCtl.find);
    router.get('/product/review/findAll', productReviewCtl.findAll);

    return parentRouter.use('/', router);
}

/** Khởi tạo đường dẫn dành cho user */
const initUserRoutes = (parentRouter) => {
    const router = express.Router();

    // Chức năng chỉnh sửa giỏ hàng
    router.post('/cart/create', cartCtl.create);
    router.get('/cart/find', cartCtl.findByUser);
    router.put('/cart/update', cartCtl.update);
    router.delete('/cart/delete', cartCtl.destroy);

    // Chức năng thao tác với review
    router.post('/product/review/create', productReviewCtl.create);
    router.put('/product/review/update', productReviewCtl.update);

    // Chức năng đặt hàng và xem lịch sử đơn hàng
    router.post('/order/create', soldProductCtl.createOrder);
    router.get('/order/history', soldProductCtl.findByUser);

    return parentRouter.use('/user', router);
}

/** Khởi tạo đường dẫn dành cho admin */
const initAdminRoutes = (parentRouter) => {
    const router = express.Router();

    // Chức năng RUD các người dùng
    router.get('/user/findOne', userCtl.findOne);
    router.get('/user/findAll', userCtl.findAll);
    router.put('/user/update', userCtl.update);
    router.delete('/user/delete', userCtl.destroy);

    // Chức năng CRUD sản phẩm
    router.post('/product/create', productCtl.create);
    router.get('/product/findOne', productCtl.findOne);
    router.get('/product/findAll', productCtl.findAll);
    router.put('/product/update', productCtl.update);
    router.delete('/product/delete', productCtl.destroy);

    // Chức năng CD hình ảnh sản phẩm
    router.post('/product/image/create', upload.single('image'), productImageCtl.create);
    router.put('/product/image/update', upload.single('image'), productImageCtl.update);
    router.delete('/product/image/delete', productImageCtl.destroy);

    // Chức năng xem tất cả đơn hàng
    router.get('/order/findAll', soldProductCtl.findAll);

    return parentRouter.use('/admin', router);
}

/** Khởi tạo đường dẫn dành cho owner */
const initOwnerRoutes = (parentRouter) => {
    const router = express.Router();

    // Chỉnh sửa quyền của người dùng
    router.put('/user/role/change', userCtl.changeRole);

    return parentRouter.use('/owner', router);
}

const initRegisteredRoutes = (parentRouter) => {
    const router = express.Router();

    // Chức năng liên quan đến truy cập tài khoản
    router.delete('/logout', authCtl.logout);
    router.put('/password/update', authCtl.changePassword);

    // Hồ sơ của người dùng
    router.get('/profile', userCtl.findOne);
    router.put('/profile/update', userCtl.updateProfile);

    // Xoá đánh giá sản phẩm
    router.delete('/product/review/delete', productReviewCtl.destroy);

    return parentRouter.use('/registered', router);
}

/** Middleware kiểm tra quyền truy cập của tài khoản */
const checkPassport = async (req, res, next) => {
    if (req.path.startsWith('/user')) await passport.checkUser(req, res, next);
    else if (req.path.startsWith('/admin')) await passport.checkAdmin(req, res, next);
    else if (req.path.startsWith('/owner')) await passport.checkOwner(req, res, next);
    else if (req.path.startsWith('/registered')) await passport.checkRegistered(req, res, next);
    else next();
}

export default initWebRouters;