/**
 * Chuyển đổi một mảng có các cặp toán tử `operator` và giá trị `value` liên tiếp nhau
 * thành một đối tượng truy vấn được trong Mongoose
 * 
 * @param {[operator: String, value: any]} array Danh sách các cặp toán tử và giá trị
 * 
 * @param {String} operator Có các giá trị như lt (nhỏ hơn), lte (nhỏ hơn hoặc bằng), 
 * eq (bằng), gt (lớn hơn), gte (lớn hơn hoặc bằng) và một số toán tử khác mà Mongoose hỗ trợ
 * 
 * @returns {{key: any}}
 * 
 * @example
 * const query = ['gte', 1, 'lt', '5']; // Lớn hơn hoặc bằng 1 và bé hơn 5
 * const toObjQuery = toQueryOperatorObject(query);
 * console.log(JSON.stringify(toObjQuery, null, 2));
 * 
 * // Console sẽ hiển thị
 *   {
 *       $gte: 1,
 *       $lt: 5
 *   }
 */
const toQueryOperatorObject = (array) => {
    const result = {};

    for (let i = 0; i < array.length; i += 2) {
        const key = `$${array[i]}`;
        const value = array[i + 1];
        result[key] = value;
    }

    return result;
}

export default toQueryOperatorObject;