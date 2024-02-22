import React from 'react'

const About = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <section className='about__top'>
        <div className='about-about__top-container'>
          <div className='container'>
            <div className='about__top-inner flex items-center justify-between'>
              <div className='about__top-text animate__animated animate__delay-1s animate__fadeInLeft'>
                <p className='about__top-label'>About the store</p>
                <h1 className='about__top-title'>Online store "Loft Furniture": buy good furniture in one click!</h1>
                <p className='about__top-par'>
                  The unique format of the online store will allow you to buy the best furniture from the largest
                  factories as quickly as possible and at a bargain price!
                </p>
                <p className='about__top-par'>
                  We are grateful for the trust of more than a dozen manufacturers who gave us the opportunity to
                  present the best samples of their products in the Internet space. Direct contracts for the supply of
                  furniture from factories provide the most attractive conditions for our customers.
                </p>
              </div>
              <div className='about__top-images animate__animated animate__delay-2s animate__fadeInRight'>
                <img
                  src='/images/about-top.png'
                  alt='furniture'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='about__benefits'>
        <div className='container'>
          <h2 className='about__benefits-title'>Buy at a profit!</h2>
          <div className='about__benefits-items'>
            <div className='about__benefits-item flex'>
              <img
                src='/images/benefits/1.svg'
                alt='benefit'
              />
              <div className='about__benefits-item-text'>
                <h6 className='about__benefits-item-title'>Get Best Price</h6>
                <p className='about__benefits-item-par'>
                  We offer close to wholesale prices, which make it possible to purchase furniture cheaper than in
                  retail salons and showrooms.
                </p>
              </div>
            </div>
            <div className='about__benefits-item flex'>
              <img
                src='/images/benefits/2.svg'
                alt='benefit'
              />
              <div className='about__benefits-item-text'>
                <h6 className='about__benefits-item-title'>Direct deliveries</h6>
                <p className='about__benefits-item-par'>
                  Leading furniture factories reduce the lead time of your order, even when it comes to production of
                  items according to an individual project.
                </p>
              </div>
            </div>
            <div className='about__benefits-item flex'>
              <img
                src='/images/benefits/3.svg'
                alt='benefit'
              />
              <div className='about__benefits-item-text'>
                <h6 className='about__benefits-item-title'>Save ypur time</h6>
                <p className='about__benefits-item-par'>
                  Haven't found the best option or don't have time to search? Leave an online application with the
                  criteria and we will We will offer you some worthy samples.
                </p>
              </div>
            </div>
            <div className='about__benefits-item flex'>
              <img
                src='/images/benefits/4.svg'
                alt='benefit'
              />
              <div className='about__benefits-item-text'>
                <h6 className='about__benefits-item-title'>Customization</h6>
                <p className='about__benefits-item-par'>
                  We accept applications for the manufacture of furniture according to a personal design project from
                  buyers from anywhere in USA. Please be ready to pay in advance for personal orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='about__descr'>
        <div className='container'>
          <div className='about__descr-item'>
            <h5 className='about__descr-title'>Best deals</h5>
            <p className='about__descr-text'>
              We do everything necessary to ensure that customers get access to the latest innovations that are
              presented Furniture market. Get acquainted with each model, compare prices for analogues and choose the
              best you You can do it right now. Do you want to be the first to know about the best deals? Then subscribe
              to Newsletter!
            </p>
          </div>
          <div className='about__descr-item'>
            <h5 className='about__descr-title'>Guaranteed Quality</h5>
            <p className='about__descr-text'>
              All products are accompanied by a manufacturer's warranty. Only certified furniture. In-house quality
              control carefully checks each sample before sending it to the customer. Buyers receive the necessary
              documents - a warranty card and a receipt.
            </p>
          </div>
          <div className='about__descr-item'>
            <h5 className='about__descr-title'>Impressive assortment</h5>
            <p className='about__descr-text'>
              On a daily basis, we select the ideal samples for our catalogs from the product matrix of manufacturers
              throughout the USA. Fashionable colors, environmentally friendly materials, reliable components - here you
              will find The furniture of your dreams!
            </p>
          </div>
        </div>
      </section>

      <section className='about__features'>
        <div className='container'>
          <div className='about__features-items'>
            <div className='about__features-item about__features-item--1'>
              <h6 className='about__features-title'>Special conditions for wholesalers</h6>
              <p className='about__features-text'>
                The number of our wholesale buyers is steadily increasing and all because we have managed to offer the
                owners furniture stores have the most favorable conditions.
              </p>
            </div>
            <div className='about__features-item about__features-item--2'>
              <h6 className='about__features-title'>Prompt delivery</h6>
              <p className='about__features-text'>
                Our own courier service will quickly deliver the purchased furniture to the specified address.
              </p>
            </div>
            <div className='about__features-item about__features-item--3'>
              <h6 className='about__features-title'>Attentive service</h6>
              <p className='about__features-text'>
                Qualified managers of the online store will answer all questions about the assortment and the provided
                opportunities, as well as help to place an order and monitor the implementation of customer wishes when
                ordering furniture.
              </p>
            </div>
            <div className='about__features-item about__features-item--4'>
              <h6 className='about__features-title'>Every fifth customer orders from us again! </h6>
              <p className='about__features-text'>
                And we thank everyone who took advantage of our unique offer, ordered furniture quickly and
                inexpensively and recommended it to friends and acquaintances.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='about__economy'>
        <div className='container'>
          <h2 className='about__economy-title'>Мы поможем сэкономить время, силы и деньги!</h2>
          <div className='about__economy-items flex items-center justify-between'>
            <div className='about__economy-item flex'>
              <div className='about__economy-box'>
                <h6 className='about__economy-item-title'>Time. </h6>
                <p className='about__economy-item-text'>
                  We will accept your application as soon as possible. If necessary, we will select worthy options for
                  you in terms of criteria.
                </p>
              </div>
            </div>
            <div className='about__economy-item flex'>
              <div className='about__economy-box'>
                <h6 className='about__economy-item-title'>Effort. </h6>
                <p className='about__economy-item-text'>
                  We will buy in bulk or order at the factory, saving you from lengthy discussions of the order with the
                  contractor. We curate all stages of work on the order.
                </p>
              </div>
            </div>
            <div className='about__economy-item flex'>
              <div className='about__economy-box'>
                <h6 className='about__economy-item-title'>Money.</h6>
                <p className='about__economy-item-text'>You will definitely buy furniture cheaper than retail.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='about__motto'>
        <div className='container'>
          <p className='about__motto-text'>
            What do we not save on? <br />
            On your comfort and quality of furniture!
          </p>
        </div>
      </div>
    </>
  )
}

export default About
