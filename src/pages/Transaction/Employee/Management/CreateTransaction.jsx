import React from "react";
import useLocation from "../../../../hooks/useLocation";
import Button from "../../../../ui/Button/Button";
import Input from "../../../../ui/Input/Input";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../../CSS/Director.css";

import arrow from "../../../../assets/arrow.svg";
import fitler_icon from "../../../../assets/filter.svg";
import default_avatar from "../../../../assets/default_avatar.png";

const CreateTransaction = () => {
  const { provinceData, districtData, getProvince, getDistrict } =
    useLocation(toast);

  const [forms, setForms] = useState([{ id: 1 }]); // Initial form

  const handleAddButtonClick = () => {
    const newForm = { id: forms.length + 1 };
    setForms([...forms, newForm]);
  };

  const handleRemoveForm = (formId) => {
    const updatedForms = forms.filter((form) => form.id !== formId);
    setForms(updatedForms);
  };

  //useEffect
  useEffect(() => {
    getProvince();
  }, []);

  return (
    <div className="manager">
      <h1 className="page_title">Tạo đơn hàng</h1>
      <div className="main__form__input">
        <div className="sender__input">
          <div className="sender__input__title">
            <h3>1. Người gửi</h3>
          </div>
          <Input className="form__input" placeholder="Tên người gửi"></Input>
          <Input className="form__input" placeholder="Số điện thoại"></Input>
          <div className="choose__location__title">
            <h4>Chọn địa chỉ</h4>
          </div>

          <div className="choose__location">
            <select
              name="province"
              id="province"
              onChange={(e) => {
                getDistrict(e.target.value);
                let text = e.target.options[e.target.selectedIndex].text;
                text = text.replace("Tỉnh ", "");
                text = text.replace("Thành phố ", "");
                console.log(text);
              }}
            >
              <option value="" disabled>
                Select Province
              </option>
              {provinceData?.map((province) => (
                <option value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </select>
            <select
              name="district"
              id="district"
              onChange={(e) => {
                console.log(e.target.options[e.target.selectedIndex].text);
                let text = e.target.options[e.target.selectedIndex].text;
                text = text.replace("Quận ", "");
                text = text.replace("Huyện ", "");
                console.log(text);
              }}
            >
              <option value="" disabled>
                Select District
              </option>
              {districtData?.map((district) => (
                <option value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>
          </div>

          <Input className="form__input" placeholder="Địa chỉ chi tiết"></Input>
          <Input className="form__input" placeholder="Email"></Input>
        </div>
        <div className="receiver__output">
          <div className="sender__input__title">
            <h3>2. Người nhận</h3>
          </div>
          <Input className="form__input" placeholder="Tên người gửi"></Input>
          <Input className="form__input" placeholder="Số điện thoại"></Input>
          <div className="choose__location__title">
            <h4>Chọn địa chỉ</h4>
          </div>
          <div className="choose__location">
            <select
              name="province"
              id="province"
              onChange={(e) => {
                getDistrict(e.target.value);
                let text = e.target.options[e.target.selectedIndex].text;
                text = text.replace("Tỉnh ", "");
                text = text.replace("Thành phố ", "");
                console.log(text);
              }}
            >
              <option value="" disabled>
                Select Province
              </option>
              {provinceData?.map((province) => (
                <option value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </select>
            <select
              name="district"
              id="district"
              onChange={(e) => {
                console.log(e.target.options[e.target.selectedIndex].text);
                let text = e.target.options[e.target.selectedIndex].text;
                text = text.replace("Quận ", "");
                text = text.replace("Huyện ", "");
                console.log(text);
              }}
            >
              <option value="" disabled>
                Select District
              </option>
              {districtData?.map((district) => (
                <option value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>
          </div>
          <Input className="form__input" placeholder="Địa chỉ chi tiết"></Input>
          <Input className="form__input" placeholder="Email"></Input>
        </div>
      </div>
      <div className="extra__form__input">
        <div className="extra__form__input__left">
          <div className="sender__input__title">
            <h3>3. Đơn hàng</h3>
          </div>
          <div className="transaction__package__container">
            {forms.map((form) => (
              <div key={form.id} className="transaction__form">
                <div>
                  <Input className="form__input" placeholder="Tên đơn hàng" />
                </div>

                <div>
                  <Input
                    className="form__input"
                    placeholder="Chi tiết đơn hàng"
                  />
                </div>

                <div className="input__dropdown">
                  <h4>Loại đơn hàng</h4>
                  <select name="" id="">
                    <option value="">Đơn hàng thường</option>
                    <option value="">Đơn hàng hộ</option>
                  </select>
                </div>

                <div>
                  <h4>Giá trị đơn hàng</h4>
                </div>

                <div className="transaction__value">
                  <div className="input__form">
                    <Input
                      className="form__input__value"
                      placeholder="Cân nặng"
                    />
                  </div>
                  <div className="input__form">
                    <Input
                      className="form__input__value"
                      placeholder="Số lượng"
                    />
                  </div>
                  <div className="delete__button"></div>
                </div>

                <Button
                  className={"danger"}
                  text={"Xoá hàng hoá"}
                  onClick={() => handleRemoveForm(form.id)}
                />
              </div>
            ))}

            <Button
              text={"Thêm hàng hoá"}
              className={"action"}
              onClick={handleAddButtonClick}
            />
          </div>
        </div>
        <div className="extra__form__input__right">
          <div className="sender__input__title">
            <h3>4. Thông tin vận chuyển</h3>
          </div>

          <div className="transaction__delivery__container">
            <div className="input__dropdown">
              <h4>Chọn phương thức vận chuyển</h4>
              <select name="" id="">
                <option value="">COD</option>
                <option value="">Chuyển Khoản</option>
              </select>
            </div>
            <Input
              className="form__input"
              placeholder="Nhập phí trả trước"
            ></Input>
          </div>

          <Button
            className={"action"}
            text={"Tạo đơn hàng"}
            onClick={() => {
              toast.success("Tạo đơn hàng thành công");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTransaction;
