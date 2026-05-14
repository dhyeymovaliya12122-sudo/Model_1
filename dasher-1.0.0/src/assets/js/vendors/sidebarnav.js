

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('miniSidebar');
  const content = document.getElementById('content');
  const sidebarToggles = document.querySelectorAll('.sidebar-toggle');
  const isSidebarExpanded = localStorage.getItem('sidebarExpanded') === 'true';

  
  sidebarToggles.forEach((toggleButton) => {
    toggleButton.addEventListener('click', () => {
      if (localStorage.getItem('sidebarExpanded') === 'true') {
        document.documentElement.classList.add('collapsed');
        document.documentElement.classList.remove('expanded');
        localStorage.setItem('sidebarExpanded', 'false');
      } else {
        document.documentElement.classList.remove('collapsed');
        document.documentElement.classList.add('expanded');
        localStorage.setItem('sidebarExpanded', 'true');
      }
    });
  });

  
  const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');
  dropdownSubmenus.forEach((submenu) => {
    submenu.addEventListener('click', (event) => {
      const submenuDropdown = submenu.querySelector('.dropdown-menu');

      
      const targetLink = event.target.closest('a');
      if (targetLink && targetLink.getAttribute('href') !== '#!') {
        return; 
      }

      
      event.stopPropagation();
      event.preventDefault();

      
      submenuDropdown.classList.toggle('show', isVisible);
    });
  });
});



document.addEventListener('DOMContentLoaded', function () {
  
  var currentUrl = window.location.href;
  var currentPath = window.location.pathname;

  
  if (currentPath.startsWith('/')) {
    currentPath = currentPath.substring(1);
  }

  
  document.querySelectorAll('#miniSidebar .nav-item .nav-link, #miniSidebar .dropdown-item').forEach(function (link) {
    var linkHref = link.getAttribute('href');

    
    if (!linkHref || linkHref === '#') {
      return;
    }

    
    if (linkHref.startsWith('/')) {
      linkHref = linkHref.substring(1);
    }

    
    if (linkHref === currentPath || link.href === currentUrl) {
      link.classList.add('active');

      
      if (link.closest('.dropdown-menu')) {
        var parentDropdown = link.closest('.dropdown').querySelector('.dropdown-toggle');
        if (parentDropdown) {
          parentDropdown.classList.add('active');
          parentDropdown.setAttribute('aria-expanded', 'true');
          var dropdownMenu = parentDropdown.nextElementSibling;
          dropdownMenu.classList.add('show');
        }

        
        if (link.closest('.dropdown-submenu')) {
          var parentSubmenu = link.closest('.dropdown-submenu').querySelector('.dropdown-toggle');
          if (parentSubmenu) {
            parentSubmenu.classList.add('active');
            parentSubmenu.setAttribute('aria-expanded', 'true');
            var submenu = parentSubmenu.nextElementSibling;
            submenu.classList.add('show');
          }
        }
      }
    }
  });
});



function setSidebarHeight() {
  const sidebar = document.getElementById('miniSidebar');
  const content = document.getElementById('content'); 

  if (sidebar && content) {
    
    const contentHeight = content.getBoundingClientRect().height;
    const viewportHeight = window.innerHeight;
    const offset = 45; 

    
    sidebar.style.height = `${Math.max(viewportHeight - offset, contentHeight)}px`;
  }
}


window.addEventListener('load', setSidebarHeight);


window.addEventListener('resize', setSidebarHeight);



const observer = new MutationObserver(setSidebarHeight);
observer.observe(document.getElementById('content'), { childList: true, subtree: true });
