import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

import * as Dialog from "@radix-ui/react-dialog";
import {
  CartClose,
  CartContent,
  CartProduct,
  CartTitle,
  CartTrigger,
  ContentContainer,
  ImageContainer,
  TotalsContainer,
} from "../styles/components/cart";

import { Handbag, X } from "phosphor-react";
import Image from "next/image";
import { Button } from "../styles/global";
import { priceFormatter } from "../utils/priceFormatter";
import axios from "axios";

export function Cart() {
  const { items, removeItem } = useContext(CartContext);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);

      const lineItems = items.map((item) => {
        return {
          price: item.priceId,
          quantity: 1,
        };
      });

      const response = await axios.post("/api/checkout", {
        lineItems,
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout");
      console.log(err);
    }
  }

  const totalValue = items.reduce((acc, item) => {
    return (acc += item.unitAmount / 100);
  }, 0);

  // function handleRemoveItem(item: any) {
  //   removeItem(item.priceId);
  // }

  return (
    <Dialog.Root>
      <CartTrigger>
        {items.length > 0 && <span> {items.length} </span>}
        <Handbag weight="bold" size={24} color="#B930D6" />
      </CartTrigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X weight="bold" size={24} color="#B930D6" />
          </CartClose>

          <ContentContainer>
            <CartTitle>Sacola de Compras</CartTitle>

            <section>
              {items.map((item) => (
                <CartProduct key={item.priceId}>
                  <ImageContainer>
                    <Image
                      src={item.imageUrl}
                      alt=""
                      width={102}
                      height={102}
                    />
                  </ImageContainer>

                  <div>
                    <span>{item.name}</span>
                    <strong>
                      {priceFormatter.format(item.unitAmount / 100)}
                    </strong>
                    <button onClick={() => removeItem(item.priceId)}>
                      Remover
                    </button>
                  </div>
                </CartProduct>
              ))}
            </section>
          </ContentContainer>

          <TotalsContainer>
            <section>
              <div>
                <span>Quantidade</span>
                <span>{items.length}</span>
              </div>

              <div>
                <strong>Valor total</strong>
                <strong>{priceFormatter.format(totalValue)}</strong>
              </div>
            </section>

            <Button
              disabled={isCreatingCheckoutSession}
              onClick={handleBuyButton}
            >
              Finalizar Compra
            </Button>
          </TotalsContainer>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
