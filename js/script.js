window.addEventListener('DOMContentLoaded', () => {
    //////TEBS
      const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent')
            tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
      tabsContent.forEach(item => {
        item.style.display = 'none';
      });
    
      tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
      });
    }
    function showTabContent(i = 0) {
      tabsContent[i].style.display = 'block';
      tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();
    
    tabsParent.addEventListener('click', (event) => {
      const target = event.target;
    
      if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
           if (target == item) {
            hideTabContent();
            showTabContent(i);
           }
        });
      }
    });
    /* -----------------TIMER---------------------------------------------*/
    
    /* const deadline = '2023-02-26'; */
    const deadline = '2025-02-26';
    
    function getTimeRemaining(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor( (t / (1000 * 60 * 60 * 24)) ),
      hours = Math.floor((t / (1000 * 60 * 60) % 24)),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);
    
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }
    function getZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }
    
        function setClock(selector, endtime) {
          const timer = document.querySelector(selector),
          days =timer.querySelector('#days'),
          hours =timer.querySelector('#hours'),
          minutes =timer.querySelector('#minutes'),
          seconds =timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
    
          updateClock();
    
          function updateClock() {
            const t = getTimeRemaining(endtime);
    
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
    
            if (t.total <= 0) {
              clearInterval(timeInterval);
            }
          }
        }
    
        setClock('.timer', deadline);
    
    /* -----------------TIMER--------end-------------------------------------*/
    /* --------------------------Modal-------start--------------------------- */
  
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');


        function openModel() {
          modal.classList.add('show');
          modal.classList.remove('hide');
          document.body.style.overflow = 'hidden';
          clearInterval(modelTimerId);
        }

            modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModel)
    });

                  function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
        document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });
    const modelTimerId = setTimeout(openModel, 50000);

    function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
        openModel();
        window.removeEventListener('scroll', showModalByScroll);
   }
    }
    window.addEventListener('scroll', showModalByScroll);

   

    /* ------------------------------Modal----end---------------------------- */
    /* ----------------------------класси для карточок----------------------- */
class MenuCard {
  constructor(src, alt, title, descr, price, parentSelector, ...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.classes = classes;
    this.parent = document.querySelector(parentSelector);
    this. transfer = 27;
    this.changeToUAH();
  }
  changeToUAH() {
        this.price = this.price * this.transfer;
  }
  render() {
    const element = document.createElement('div');
    if(this.classes.length === 0) {
      this.element = "menu__item";
      element.classList.add();
    } else {
      this.classes.forEach(className => element.classList.add(className));
    }
    element.innerHTML =`
    <img src=${this.src} alt=${this.alt}>
    <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
    <div class="menu__item-descr">${this.descr}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    </div>

    `;
    this.parent.append(element);
  }
}
    new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      '.menu .container',
      'menu__item',
      'big'

    ).render();
    new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      14,
      '.menu .container',
      'menu__item'

    ).render();
    new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      21,
      '.menu .container',
      'menu__item'

    ).render();

//Forms

const forms = document.querySelectorAll('form');

const message = {
  loading: "загрузка",
  success: "спасибо! скоро мы с вами свяжемся",
  failure: "что-то пошло не так..."
};

forms.forEach(item => {
  postData(item)
})

function postData(form) {
   form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const formData = new FormData(form);

      const object = {};
      formData.forEach(function(value, key) {
        object[key] = value;
      });

      fetch('server.php', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(object)
      }).then(data => data.text())
        .then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      })
   });
}
function showThanksModal(message) {
  const prevModalDialog = document.querySelector('.modal__dialog');

  prevModalDialog.classList.add('hide');
  openModel();

  const thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__dialog');
  thanksModal.innerHTML =`
  <div class="modal__content">
  <div class="modal__close" data-close>×</div>
  <div class="modal__title">${message}</div>
  </div>

  `;
  document.querySelector('.modal').append(thanksModal);
  setTimeout(() => {
thanksModal.remove();
prevModalDialog.classList.add('show');
prevModalDialog.classList.remove('hide');
closeModal();
  }, 4000);
}




    });