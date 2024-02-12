module.exports = function (room) {
  return {
    id: room._id,
    sysId: room.sys_id,
    title: room.title,
    imageUrl: room.image_url,
    content: room.content,
    price: room.price,
  };
};
