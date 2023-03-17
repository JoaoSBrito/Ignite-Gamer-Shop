import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100'
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    marginTop: '5rem',
    display: 'block',
    color: '$purple500',
    fontSize: '$l',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$purple300',
    }
  }
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 130,
  height: 145,
  background: 'linear-gradient(180deg, $purple500 0%, #7465D4 100%);',
  borderRadius: 1000,
  padding: '1rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '4rem',

  div: {
    display: 'flex',
  },

  img: {
    objectFit: 'fill',
    borderRadius: 9999,
  }
})

export const ProductsContainer = styled('div', {
  display:"flex",
  gap: 16,

  marginBottom: '1rem'
})