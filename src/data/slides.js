const slides = [
  {
    id: 'stats',
    title: 'Status do Pretendente',
    description: 'Romântico com buffs permanentes de atenção e humor.',
    imageSrc: '/eu.jpeg',
    imageAlt: 'Foto do pretendente',
    stats: [
      { label: 'Carisma', value: '99' },
      { label: 'Cafuné', value: 'Infinito' },
      { label: 'Piadas internas', value: 'S+', valueHint: 'risada garantida' },
      { label: 'Companhia', value: '24/7' }
    ]
  },
  {
    id: 'reviews',
    title: 'Reviews Oficiais',
    description: 'Avaliações reais de quem convive com ele todos os dias.',
    imageSrc: '/cachorro.jpeg',
    imageAlt: 'Foto do cachorro',
    reviews: [
      {
        author: 'Mãe do pretendente',
        text: 'Educado, carinhoso e sempre ajuda nas louças. Recomendo muito!'
      },
      {
        author: 'Cachorro',
        text: 'Ganha petiscos extras e faz carinho na barriga. Nota 5 patinhas.'
      }
    ]
  }
]

export { slides }
