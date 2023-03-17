import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  productImageUrls: string[];
}

export default function Success({
  customerName,
  productImageUrls,
}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <div>
          {productImageUrls.map((imageUrl) => (
            <ImageContainer key={imageUrl}>
              <Image src={imageUrl} alt="" width={120} height={110} />
            </ImageContainer>
          ))}
        </div>

        {/* <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt=""></Image>
        </ImageContainer> */}

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong> {customerName} </strong>, suas compras já estão a
          caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id);

  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });
  console.log(session);

  const costumerName = session.customer_details.name;
  const products = session.line_items?.data.map((item) => {
    return item.price?.product as Stripe.Product;
  });
  const productImageUrls = products?.map((product) => product.images[0]);

  return {
    props: {
      costumerName,
      productImageUrls,
    },
  };
};
