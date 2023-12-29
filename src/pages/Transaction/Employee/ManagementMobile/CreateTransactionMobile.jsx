import React from "react";
import Loading from "../../../../ui/Loading/Loading";
import Toast from "../../../../ui/Toast/Toast";
import useLocation from "../../../../hooks/useLocation";
import useTransactionEmployee from "../../../../hooks/useTransactionEmployee";
import Button from "../../../../ui/Button/Button";
import Input from "../../../../ui/Input/Input";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../../../CSS/Director.css";

const LocationInput = ({ id }) => {
  const { provinceData, districtData, getProvince, getDistrict } =
    useLocation(toast);

  const [newTransaction, setNewTransaction] = useState({});

  const handleChange = (name, value) => {
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  useEffect(() => {
    getProvince();
  }, []);

  return (
    <div className="choose__location__mobile">
      <select
        name="province"
        id={`${id}_city_input`}
        onChange={(e) => {
          getDistrict(e.target.value);
          let text = e.target.options[e.target.selectedIndex].text;
          //   text = text.replace("Tỉnh ", "");
          //   text = text.replace("Thành phố ", "");
          console.log(text);
        }}
      >
        <option value="" disabled>
          Select Province
        </option>
        {provinceData?.map((province) => (
          <option value={province.province_id}>{province.province_name}</option>
        ))}
      </select>
      <select
        name="district"
        id={`${id}_district_input`}
        onChange={(e) => {
          console.log(e.target.options[e.target.selectedIndex].text);
          let text = e.target.options[e.target.selectedIndex].text;
          //   text = text.replace("Quận ", "");
          //   text = text.replace("Huyện ", "");
          console.log(text);
        }}
      >
        <option value="" disabled>
          Select District
        </option>
        {districtData?.map((district) => (
          <option value={district.district_id}>{district.district_name}</option>
        ))}
      </select>
    </div>
  );
};

const CreateTransactionMobile = () => {
  const [forms, setForms] = useState([{ id: 1 }]); // Initial form
  const [packageCount, setPackageCount] = useState(1);

  const { listTransaction, transactionEmployeeLoading, createTransaction } =
    useTransactionEmployee(toast);

  const handleAddButtonClick = () => {
    const newForm = { id: forms.length + 1 };
    setForms([...forms, newForm]);
    setPackageCount(packageCount + 1);
  };

  const handleRemoveForm = (formId) => {
    const updatedForms = forms.filter((form) => form.id !== formId);
    setForms(updatedForms);
    setPackageCount(packageCount - 1);
  };

  const getSenderInput = () => {
    return {
      name: window["sender_name_input"].value,
      address: {
        city: window["sender_city_input"].options[
          window["sender_city_input"].selectedIndex
        ].text,
        district:
          window["sender_district_input"].options[
            window["sender_district_input"].selectedIndex
          ].text,
        detail: window["sender_detail_input"].value,
      },
      phoneNumber: window["sender_phoneNumber_input"].value,
      email: window["sender_email_input"].value,
    };
  };

  const getReceiverInput = () => {
    return {
      name: window["receiver_name_input"].value,
      address: {
        city: window["receiver_city_input"].options[
          window["receiver_city_input"].selectedIndex
        ].text,
        district:
          window["receiver_district_input"].options[
            window["receiver_district_input"].selectedIndex
          ].text,
        detail: window["receiver_detail_input"].value,
      },
      phoneNumber: window["receiver_phoneNumber_input"].value,
      email: window["receiver_email_input"].value,
    };
  };

  const getPackageInput = () => {
    // return {
    //   name: window["package_name_input"].value,
    //   description: window["package_description_input"].value,
    //   type: window["package_type_input"].value,
    //   weight: window["package_weight_input"].value,
    //   quantity: window["package_quantity_input"].value,
    // };
    const packages = [];
    for (let i = 0; i < packageCount; i++) {
      packages.push({
        name: window[`package_name_input_${i + 1}`].value,
        description: window[`package_description_input_${i + 1}`].value,
        type: window[`package_type_input_${i + 1}`].value,
        weight: window[`package_weight_input_${i + 1}`].value,
        postage: window[`package_postage_input_${i + 1}`].value,
        quantity: window[`package_quantity_input_${i + 1}`].value,
      });
    }
    return packages;
  };

  const getDeliveryInput = () => {
    return {
      transaction_type: window["package_transaction_type_input"].value,
      prepaid: window["package_prepaid_input"].value,
    };
  };

  return (
    <div className="manager">
      <h1 className="page_title">Tạo đơn hàng</h1>
      <div className="main__form__input__mobile">
        <div className="sender__input__mobile">
          <div className="sender__input__title">
            <h3>1. Người gửi</h3>
          </div>
          <Input
            id="sender_name_input"
            className="form__input"
            placeholder="Tên người gửi"
          />
          <Input
            id="sender_phoneNumber_input"
            className="form__input"
            placeholder="Số điện thoại"
          />
          <div className="choose__location__title">
            <h4>Chọn địa chỉ</h4>
          </div>

          <LocationInput id={"sender"} />

          <Input
            id="sender_detail_input"
            className="form__input"
            placeholder="Địa chỉ chi tiết"
          />
          <Input
            id="sender_email_input"
            className="form__input"
            placeholder="Email"
          />
        </div>
        <div className="receiver__output__mobile">
          <div className="sender__input__title">
            <h3>2. Người nhận</h3>
          </div>
          <Input
            id="receiver_name_input"
            className="form__input"
            placeholder="Tên người nhận"
          />
          <Input
            id="receiver_phoneNumber_input"
            className="form__input"
            placeholder="Số điện thoại"
          />
          <div className="choose__location__title">
            <h4>Chọn địa chỉ</h4>
          </div>

          <LocationInput id={"receiver"} />

          <Input
            id="receiver_detail_input"
            className="form__input"
            placeholder="Địa chỉ chi tiết"
          />
          <Input
            id="receiver_email_input"
            className="form__input"
            placeholder="Email"
          />
        </div>
      </div>
      <div className="extra__form__input__mobile">
        <div className="extra__form__input__left__mobile">
          <div className="sender__input__title">
            <h3>3. Đơn hàng</h3>
          </div>
          <div className="transaction__package__container">
            {forms.map((form) => (
              <div key={form.id} className="transaction__form">
                <div>
                  <Input
                    id={`package_name_input_${form.id}`}
                    className="form__input"
                    placeholder="Tên đơn hàng"
                  />
                </div>

                <div>
                  <Input
                    id={`package_description_input_${form.id}`}
                    className="form__input"
                    placeholder="Chi tiết đơn hàng"
                  />
                </div>

                <div className="input__dropdown">
                  <h4>Loại đơn hàng</h4>
                  <select name="type" id={`package_type_input_${form.id}`}>
                    <option value="PACKAGE">Hàng Hoá</option>
                    <option value="DOCUMENT">Tài Liệu</option>
                  </select>
                </div>

                <div>
                  <h4>Giá trị đơn hàng</h4>
                </div>

                <div className="transaction__value">
                  <div className="input__form">
                    <Input
                      type="number"
                      id={`package_weight_input_${form.id}`}
                      className="form__input__value"
                      placeholder="Cân nặng"
                    />
                  </div>
                  <div className="input__form">
                    <Input
                      type="number"
                      id={`package_quantity_input_${form.id}`}
                      className="form__input__value"
                      placeholder="Số lượng"
                    />
                  </div>
                  <div className="input__form">
                    <Input
                      type="number"
                      id={`package_postage_input_${form.id}`}
                      className="form__input__value"
                      placeholder="Giá trị"
                    />
                  </div>
                  <div className="delete__button"></div>
                </div>

                <Button
                  className={"danger"}
                  text={"Xoá hàng hoá"}
                  onClick={() => {
                    handleRemoveForm(form.id);
                    console.log(packageCount);
                  }}
                />
              </div>
            ))}

            <Button
              text={"Thêm hàng hoá"}
              className={"action"}
              onClick={() => {
                handleAddButtonClick();
                console.log(packageCount);
              }}
            />
          </div>
        </div>
        <div className="extra__form__input__right__mobile">
          <div className="sender__input__title">
            <h3>4. Thông tin vận chuyển</h3>
          </div>

          <div className="transaction__delivery__container">
            <div className="input__dropdown">
              <h4>Chọn phương thức vận chuyển</h4>
              <select id="package_transaction_type_input">
                <option value="Hoả tốc">Hoả tốc</option>
                <option value="Nhanh">Nhanh</option>
                <option value="Tiết kiệm">Tiết Kiệm</option>
              </select>
            </div>
            <Input
              id="package_prepaid_input"
              type="number"
              className="form__input"
              placeholder="Nhập phí trả trước"
            />
          </div>

          <Button
            className={"action"}
            text={"Tạo đơn hàng"}
            onClick={() => {
              createTransaction({
                transaction_qr_tracker:
                  "http://localhost:3000/view/transaction/?transaction=",
                sender: getSenderInput(),
                receiver: getReceiverInput(),
                list_package: getPackageInput(),
                source_transaction_spot: JSON.parse(
                  sessionStorage.getItem("user")
                ).workplace.workplace_id,
                transaction_type: getDeliveryInput().transaction_type,
                prepaid: getDeliveryInput().prepaid,
              });
            }}
          />
        </div>
      </div>
      <ToastContainer className="toasify" />
      {transactionEmployeeLoading && <Loading />}
    </div>
  );
};

export default CreateTransactionMobile;
