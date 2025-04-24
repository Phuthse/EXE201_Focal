import React from "react";
import "./footerFocal.css";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export default function footerFocal() {
  return (
    <div className="mt-[120px] h-[280px] bg-black text-white flex flex-row justify-between px-20 items-center">
      <div>
        <h1>focal</h1>
        <p className="w-[300px] font-thin">
          Bắt khoảnh khắc - Giữ thời gian
        </p>
      </div>
      <div className="flex flex-row gap-20">
        <div>
          <ul className="support_center">
            <p>Trung tâm hỗ trợ</p>
            <li>
              <Link to={`/privacy_policy`}>Chính sách bảo mật</Link>
            </li>
            <li>
              <Link to={`/policy`}>Điều khoản sử dụng</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="support_center">
            <p> Thông tin liên lạc</p>
            <li>Điện thoại : 0335851266</li>
            <li>Email: focal@gmail.com</li>
            <li>Địa chỉ: Ho Chi Minh - Viet Nam</li>
            <li className="pt-2">
              <Link
                to={`https://www.facebook.com/profile.php?id=61573170474337`}
                target="_blank"
                className="text-3xl mr-3 w-auto h-auto"
              >
                <FacebookOutlined />
              </Link>
              <Link
                to={`https://www.instagram.com/focalvietnam?igsh=NzBieG40MHM1YTc5`}
                target="_blank"
                className="text-3xl mr-3 w-auto h-auto"
              >
                <InstagramOutlined />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
