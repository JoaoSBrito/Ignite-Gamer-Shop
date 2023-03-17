import { CartContext } from "@/src/context/CartContext";
import { Button } from "@/src/styles/global";
import { priceFormatter } from "@/src/utils/priceFormatter";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext, useState } from "react";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

interface ProductProps {
  name: string;
  imageUrl: string;
  priceId: string;
  unitAmount: number;
  description: string;
}

export default function Product({
  name,
  imageUrl,
  priceId,
  unitAmount,
  description,
}: ProductProps) {
  const { addItem } = useContext(CartContext);

  function handleAddItem() {
    addItem({
      name,
      imageUrl,
      priceId,
      unitAmount,
    });
  }
  return (
    <>
      <Head>
        <title>{`${name} | Gamer Shop`}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{name}</h1>
          <span>{priceFormatter.format(Number(unitAmount) / 100)}</span>

          <p>{description}</p>

          <Button onClick={handleAddItem}>Comprar agora</Button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await stripe.products.list({ active: true });
  const products = response.data;
  const paths = products.map((product) => {
    return {
      params: {
        id: product.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id as string;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      name: product.name,
      description: product.description,
      imageUrl: product.images[0],
      priceId: price.id,
      unitAmount: price.unit_amount,
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
