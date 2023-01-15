import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editAmount,
  getBasket,
  removeBasket,
} from "../../reducers/Slice/cartSlice";
import styles from "./basket.module.scss";
import bagIcon from "../../MainMenu/files/logoBasket.svg";
import BasketCart from "./BasketCart";

const CartItem = () => {
  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);

  const handleCartOpen = () => setOpened(!opened);

  const basket = useSelector((state) => state.cartSlice.basket);
  const products = useSelector((state) => state.productSlice.products);

  console.log("PROD", products);

  useEffect(() => {
    dispatch(getBasket());
  }, [dispatch]);

  console.log(basket);

  // TOTAL
  let array = [];
  let sum = 0;
  let counter = 0;

  for (let index = 0; index < products?.length; index++) {
    for (let i = 0; i < basket?.products?.length; i++) {
      if (products[index]?._id === basket?.products[i]?.productId) {
        array.push(products[index]);
        sum = sum + products[index]?.price * basket?.products[i].amount;
        counter = counter + products[index]?.price;
      }
    }
  }
  ////////////////////////////

  return (
    <>
      <div onClick={handleCartOpen} className={styles.cartButton}>
        <img src={bagIcon} alt="" />
        {basket.products?.length > 0 && <span>{basket.products?.length}</span>}
      </div>

      {opened && (
        <div className={styles.items}>
          <div className={styles.close}>
            <button onClick={handleCartOpen}>Х</button>
          </div>
          <div className={styles.overBlock}>
            {basket.products?.length > 0 ? (
              <table>
                <thead>
                  <tr>
                  <th>продукт</th>
                    <th>название</th>
                    <th>кол-во</th>
                    <th>цена</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {basket.products?.map((item, index) => {
                    return <BasketCart item={item} />;
                  })}
                </tbody>
                <div className={styles.total}>Итого: {sum}₽</div>
              </table>
            ) : (
              <p>"корзина пуста"</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
