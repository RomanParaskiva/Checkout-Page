"use strict"

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form'),
        inputs = [...form.querySelectorAll('input')],
        submitBtn = form.querySelector('[type="submit"]')

    const handleInputs = (arr) => {
        const errors = []

        arr.forEach(input => {
            if (!input.value) {
                errors.push(input.name + ' dont be a empty')
                input.classList.add('not-valid')
            }
        })

        if (errors.length > 0) {
            errors.reverse().forEach(error => createNotification(error))
        } else {
            arr.forEach(input => input.classList.add('valid'))
        }
    }

    submitBtn.addEventListener('click', e => {
        e.preventDefault()
        handleInputs(inputs)
    })

    const countryInput = document.querySelector('input[name="country"]')

    try {
        const optionWrapper = document.querySelector('.option-wrapper')
        countryInput.addEventListener('click', e => {
            console.log(optionWrapper.classList.contains('show'))
            optionWrapper.classList.add('show')

            const options = [...optionWrapper.querySelectorAll('li')]

            options.forEach(option => {
                option.addEventListener('click', e => {
                    console.log(option.innerHTML)
                    countryInput.placeholder = option.innerHTML
                    countryInput.value = option.innerHTML
                    optionWrapper.classList.remove('show')
                })
            })
        })

    } catch (error) {

    }


    const createNotification = (text) => {
        if (text) {
            const div = document.createElement('div')
            div.classList.add('notification')
            div.innerHTML = text

            document.body.appendChild(div)

            setTimeout(() => {
                document.body.removeChild(div)
            }, 2000)
        }
    }

    const agrWrapper = document.querySelector('.agr')

    const chckbox = agrWrapper.querySelector('input[type="checkbox"]'),
        checked = agrWrapper.querySelector('span.checked'),
        unchecked = agrWrapper.querySelector('span.unchecked')

    chckbox.addEventListener('change', e => {
        if (chckbox.checked) {
            checked.style.display = 'block'
            unchecked.style.display = 'none'
        } else {
            checked.style.display = 'none'
            unchecked.style.display = 'block'
        }
    })

    const productsWrapper = [...document.querySelectorAll('.product-wrapper')],
        shipping = document.querySelector('.shipping'),
        total = document.querySelector('.total')



    productsWrapper.forEach(product => {
        let count = product.querySelector('.count')

        const plus = product.querySelector('.plus'),
            minus = product.querySelector('.minus')

        plus.addEventListener('click', e => {
            count.innerHTML = +count.innerHTML + 1
            handleTotal()
        })

        minus.addEventListener('click', e => {
            if (+count.innerHTML > 1) {
                count.innerHTML = +count.innerHTML - 1
                handleTotal()
            }
        })
    })

    const handleTotal = () => {
        let t = 0
        productsWrapper.forEach(product => {
            t = t + +product.querySelector('.price').dataset.price * +product.querySelector('.count').innerHTML
        })

        t = t + +shipping.dataset.shipping

        total.innerHTML = t.toFixed(2)
    }

    handleTotal()


    document.body.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            handleInputs(inputs)
        }
    })

})