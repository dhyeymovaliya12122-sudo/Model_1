'use strict';
var theme = {
  init: function () {
    theme.otpVarification();
    theme.checkbox();
    theme.alertJS();
    theme.popovers();
    theme.tooltip();
    theme.validation();
    theme.toast();
    theme.sidbarNav();
    theme.search();
  },

  
  search: () => {
    document.addEventListener('DOMContentLoaded', () => {
      const searchWord = () => {
        const input = document.getElementById('globalSearchInput').value.toLowerCase(); 
        const listItems = document.querySelectorAll('.modal-body li'); 

        listItems.forEach((item) => {
          const text = item.textContent.toLowerCase(); 
          item.style.display = text.includes(input) ? '' : 'none'; 
        });
      };

      const searchInput = document.getElementById('globalSearchInput');
      if (searchInput) {
        searchInput.addEventListener('keyup', searchWord);
      }
    });
  },

  sidbarNav: () => {
    const links = document.querySelectorAll('.sidebar-nav-fixed a');

    if (links.length) {
      links.forEach((link) => {
        link.addEventListener('click', function (event) {
          const currentPath = location.pathname.replace(/^\
          const linkPath = this.pathname.replace(/^\
          const currentHost = location.hostname;

          
          if (currentPath === linkPath && currentHost === this.hostname) {
            let target = document.querySelector(this.hash);

            if (!target) {
              target = document.querySelector(`[name="${this.hash.slice(1)}"]`);
            }

            if (target) {
              event.preventDefault();

              window.scrollTo({
                top: target.offsetTop - 90,
                behavior: 'smooth',
              });

              
              target.setAttribute('tabindex', '-1'); 
              target.focus({ preventScroll: true }); 
            }
          }

          
          links.forEach((link) => link.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }
  },

  
  alertJS: () => {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>',
      ].join('');

      alertPlaceholder.append(wrapper);
    };

    const alertTrigger = document.getElementById('liveAlertBtn');
    if (alertTrigger) {
      alertTrigger.addEventListener('click', () => {
        appendAlert('Nice, you triggered this alert message!', 'success');
      });
    }
  },

  
  popovers: () => {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));
  },

  
  tooltip: () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  },

  
  validation: () => {
    
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        'submit',
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        },
        false
      );
    });
  },

  
  toast: () => {
    const toastTrigger = document.getElementById('liveToastBtn');
    const toastLiveExample = document.getElementById('liveToast');

    if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show();
      });
    }
  },

  
  otpVarification: () => {
    document.moveToNextInput = function (input) {
      if (input.value.length === input.maxLength) {
        
        const currentIndex = Array.from(input.parentElement.children).indexOf(input);

        
        const nextInput = input.parentElement.children[currentIndex + 1];

        
        if (nextInput) {
          nextInput.focus();
        }
      }
    };
  },

  
  checkbox: () => {
    
    const checkboxes = document.querySelectorAll('[data-indeterminate="true"]');

    
    checkboxes.forEach((checkbox) => {
      checkbox.indeterminate = true;
    });
  },
};

theme.init();
