import { Product } from "../models.js";
import mongoose from "mongoose";

const up = async () => {
    const data = [
        {
              // 1
            _id: new mongoose.Types.ObjectId('672cf37d408d47bba322d8f1'),
            name: 'Lẵng Hoa Hồng Đỏ',
            category: 'Quà tặng bạn nữ',

            discount: 20,
            price: 500000,
            stock: 20,
            isSale: true,

            description:
                `Hoa chúc mừng dành tặng người yêu.
Hoa hồng vốn được biết đến là loài hoa đại diện cho tình yêu, đặc biệt là hoa hồng đỏ, nó thể hiện sự cháy bỏng và nhiệt tình trong đó.

Đây là một gợi ý hoàn hảo để bạn dành tặng cho người yêu của mình.!`,

            brand: 'Beloved and Beyond',
            suitableAge: null,
            tag: 'limited'
        },
        {
            // 2
            _id: new mongoose.Types.ObjectId('672cf37d408d47bba322d8f2'),
            name: 'Rực Cháy (Đỏ)',
            category: 'Hoa',

            discount: null,
            price: 699000,
            stock: 20,
            isSale: true,

            description:
                `Giỏ hoa hồng là một tuyệt phẩm của sắc đỏ mãnh liệt. Với sự sắp xếp tỉ mỉ, giỏ hoa mang đến vẻ đẹp quyến rũ và tình tứ. Những đóa hoa hồng đỏ tươi, tươi sáng và quyến rũ, là biểu tượng của tình yêu và đam mê. Từng cánh hoa được chọn lựa kỹ càng, tạo nên một tác phẩm tự nhiên đầy sức sống. Giỏ hoa hồng là món quà lý tưởng để thể hiện tình cảm chân thành và gửi đi những lời chúc tốt đẹp. Mỗi cánh hoa đều phản ánh sự ngọt ngào và làm rung động trái tim người nhận. Đặt giỏ hoa hồng này làm quà, bạn sẽ tạo nên những kỷ niệm đáng nhớ và mang lại niềm vui trọn vẹn.

Hoa chính: hoa hồng, hoa baby, lá bạc`,

            brand: 'Beloved and Beyond',
            suitableAge: 3,
            tag: 'hot'
        },
        {
            // 3
            _id: new mongoose.Types.ObjectId('672cf37d408d47bba322d8f3'),
            name: 'Rực Cháy (Đỏ)',
            category: 'Hoa',

            discount: null,
            price: 2309000,
            stock: 20,
            isSale: true,

            description:
                `Giỏ hoa hồng là một tuyệt phẩm của sắc đỏ mãnh liệt. Với sự sắp xếp tỉ mỉ, giỏ hoa mang đến vẻ đẹp quyến rũ và tình tứ. Những đóa hoa hồng đỏ tươi, tươi sáng và quyến rũ, là biểu tượng của tình yêu và đam mê. Từng cánh hoa được chọn lựa kỹ càng, tạo nên một tác phẩm tự nhiên đầy sức sống. Giỏ hoa hồng là món quà lý tưởng để thể hiện tình cảm chân thành và gửi đi những lời chúc tốt đẹp. Mỗi cánh hoa đều phản ánh sự ngọt ngào và làm rung động trái tim người nhận. Đặt giỏ hoa hồng này làm quà, bạn sẽ tạo nên những kỷ niệm đáng nhớ và mang lại niềm vui trọn vẹn.

Hoa chính: hoa hồng, hoa baby, lá bạc`,

            brand: 'Beloved and Beyond',
            suitableAge: 3,
            tag: 'hot'
        },
        {
            // 4
            _id: new mongoose.Types.ObjectId('672cf37d408d47bba322d8f3'),
            name: 'Hoa Hồng Tặng Mẹ',
            category: 'Quà tặng cha mẹ',

            discount: null,
            price: 600000,
            stock: 20,
            isSale: true,

            description:
                `Thiết kế: Lẵng hoa hồng Ohara mix màu hồng dâu và đỏ đậm, mix cùng hoa baby trắng và lá khuynh diệp.

Lẵng hoa chúc mừng mang phong cách cổ điển, không quá cầu kỳ nhưng đem lại ấn tượng đẹp mắt bởi cách kết hợp màu sắc tươi sáng.

Lẵng hoa là món quà chúc mừng tuyệt vời cho các dịp đặc biệt: Sinh nhật, chúc mừng tân gia, mừng khai trương, kỉ niệm ngày cưới, lễ 14/2, 8/3, 20/10, ...

Lưu ý: 
- Một số hoa lá phụ theo mùa, cửa hàng sẽ chủ động thay thế bằng các loại hoa lá phụ khác
- Đặc tính bó/cắm hoa thủ công bằng tay, độ nở của hoa, dáng hoa, màu sắc đậm nhạt, hoa theo mùa sản phẩm sẽ chênh lệch so với hình mẫu.`,

            brand: 'Beloved and Beyond',
            suitableAge: 7,
            tag: null
        },
        {
            // 5
            _id: new mongoose.Types.ObjectId('672cf37d408d47bba322d8eb'),
            name: 'Nhẫn Round Vàng Hồng 10K',
            category: 'Quà tặng cha mẹ',

            discount: null,
            price: 659000,
            stock: 20,
            isSale: true,

            description:
                `Nhẫn Round vàng hồng 10K của DMari Jewelry là một sản phẩm trang sức tuyệt đẹp và đầy sự sang trọng. Với thiết kế thanh lịch và truyền thống, nhẫn này là món quà lý tưởng dành cho các đối tượng người nhận như Bà, Mẹ, Vợ, Con gái, Bé gái, Chị em gái, Bạn gái, Tôi, Cô, Dì, O, Mợ, Thím, Bạn bè, Đồng nghiệp, và người mà bạn muốn tặng. Sản phẩm phù hợp với nhiều dịp quan trọng như Sinh nhật, Đám cưới, Kỷ niệm ngày cưới, Cầu hôn, và nhiều dịp khác. Hãy chọn nhẫn Round vàng hồng 10K để tạo nên những khoảnh khắc đáng nhớ và quý giá!
                Bàn chơi được trang bị đầy đủ các dụng cụ khúc côn cầu như gậy, bóng và khung thành nhỏ gọn, tạo nên không gian thi đấu thú vị ngay tại nhà. Với màu sắc tươi sáng và chất liệu an toàn, sản phẩm không chỉ là một trò chơi mà còn giúp trẻ em phát triển thể chất và tư duy chiến thuật.

                Đặc điểm nổi bật:

                Thiết kế bàn chơi chắc chắn, màu sắc bắt mắt
                Các dụng cụ chơi như gậy và bóng đều được làm từ chất liệu an toàn, bền đẹp
                Kích thước vừa phải, dễ dàng sử dụng và lưu trữ
                Phát triển kỹ năng phản xạ, chiến thuật và làm việc nhóm
                Phù hợp cho trẻ em từ 6 tuổi trở lên, chơi cùng bạn bè hoặc gia đình
                Bàn chơi Khúc Côn Cầu UNITED SPORT A6030 là lựa chọn lý tưởng cho những ai yêu thích thể thao và muốn có những giây phút giải trí vui nhộn cùng người thân.`,

            brand: 'Beloved and Beyond',
            suitableAge: 13,
            tag: 'new'
        },
        {
            
        }
    ]

    await Product.create(data);
}

const down = async () => {
    await mongoose.connection.collection('Product').drop();
}

const update = async () => {
    await down();
    await up();
}

export default { up, down, update };