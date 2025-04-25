import React, { useEffect, useState } from "react";
import wishlistApi from "../../api/wishListApi";
import rentalApi from "../../api/rentalApi";

const Order = () => {
  const [cardData, setCardData] = useState([]);
  const [message, setMessage] = useState("");

  const fallbackImages = [
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1651922985926-c8fb8c1fe8c4?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574494461515-c8005821fbe5?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?q=80&w=2076&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519458246479-6acae7536988?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1536627217140-899b0bc9d881?q=80&w=2076&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486574655068-162e94137442?q=80&w=2070&auto=format&fit=crop",
  ];

  const getRandomImage = () => {
    const index = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[index];
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await rentalApi.myRental();
      const data = res.data?.data || [];

      const filtered = data.filter((item) => item.status !== "CANCELLED");

      const transformed = filtered.map((item) => ({
        id: item.rentalId,
        replacementValue: item.totalAmount,
        title: item.equipmentModel,
        code: {
          label: item.notes || "Mã thiết bị",
          value: item.serialNumber,
        },
        status: item.status,
        amount: Number(item.dailyRate) || 0, // ✅ fix tại đây
        time: item.startDate,
        endTime: item.endDate,
        brand: item.equipmentBrand,
        image: item.primaryImageUrl?.trim() || getRandomImage(),
      }));

      const sortedData = transformed.sort((a, b) => {
        if (a.status === "PENDING" && b.status !== "PENDING") {
          return -1;
        }
        if (a.status !== "PENDING" && b.status === "PENDING") {
          return 1;
        }
        return 0;
      });

      setCardData(sortedData);
    } catch (err) {
      console.error("Lỗi lấy danh sách thuê:", err);
    }
  };

  const handleRemove = async (id, status) => {
    if (status === "PENDING") {
      try {
        await rentalApi.cancelRental(id);
        setCardData((prev) => prev.filter((item) => item.id !== id));
        alert("Thuê thiết bị đã được hủy thành công!");
      } catch (err) {
        console.error("Lỗi xoá item:", err);
        alert("Lỗi khi hủy thuê, vui lòng thử lại.");
      }
    } else {
      alert(
        "Vui lòng liên hệ với người cho thuê thông qua fanpage hoặc email để được hỗ trợ."
      );
    }
  };

  return (
    <div className="w-[1600px] pl-8 flex flex-row gap-6 flex-wrap">
      {message && (
        <div className="text-center text-sm text-green-600 font-semibold">
          {message}
        </div>
      )}

      {cardData.length === 0 ? (
        <div className="text-gray-500 text-sm italic">
          Hiện tại chưa có món đồ thuê.
        </div>
      ) : (
        cardData.map((item) => (
          <CameraCard key={item.id} {...item} onRemove={handleRemove} />
        ))
      )}
    </div>
  );
};

const CameraCard = ({
  id,
  replacementValue,
  title,
  code,
  status,
  amount,
  time,
  endTime,
  brand,
  image,
  onRemove,
}) => {
  const startDate = new Date(time);
  const endDate = new Date(endTime);
  const diffTime = endDate - startDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const dailyAmount = Number(amount) || 0;
  const totalPrice = diffDays * dailyAmount;

  return (
    <div className="border h-60 w-[400px] p-4 flex flex-col justify-between text-sm">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="font-semibold">
          {brand} {title}
        </div>
        <div className="text-right">
          <div className="text-xs">{code.value}</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-4 mt-4">
        <img src={image} alt="camera" className="w-72 h-20 object-cover" />
        <div className="border border-gray-300 rounded-3xl p-2 text-xs leading-relaxed w-full">
          <div className="font-semibold text-gray-800 text-[15px] text-right">
            Từ ngày {time} <br /> đến {endTime}
          </div>
          <div className="text-right mt-1 text-sm text-gray-700">
            Tổng tiền:{" "}
            <span className="font-semibold text-black">
              {totalPrice.toLocaleString()} VND
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-2">
        <div className="text-xs text-gray-600 uppercase font-semibold text-[14px]">
          {status === "PENDING" ? "Chờ xác nhận" : "Đã xác nhận"}
        </div>
        <div
          className="text-xs underline cursor-pointer text-red-500"
          onClick={() => onRemove(id, status)}
        >
          Dừng Thuê
        </div>
      </div>
    </div>
  );
};

export default Order;
