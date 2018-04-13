(function() {
  'use strict';

  var CACHE_NAME = 'static-cache';

  var urlsToCache = [
      'index.html',
      'manifest.json',
      'data.json',
      'src/html/aguinaldo.html',
      'src/html/baguio_museum.html',
      'src/html/bell_ampi.html',
      'src/html/bell_church.html',
      'src/html/bell_house.html',
      'src/html/black_market.html',
      'src/html/botanical.html',
      'src/html/cathed.html',
      'src/html/childrens_park.html',
      'src/html/christmas_village.html',
      'src/html/church.html',
      'src/html/cjh.html',
      'src/html/good_shepherd.html',
      'src/html/holy_family.html',
      'src/html/igorot_park.html',
      'src/html/lourdes_parish.html',
      'src/html/market.html',
      'src/html/mines_view.html',
      'src/html/museo_kordilyera.html',
      'src/html/museum.html',
      'src/html/orchidarium.html',
      'src/html/panagbenga.html',
      'src/html/park.html',
      'src/html/pasalubong_center.html',
      'src/html/pink_sisters.html',
      'src/html/rose_garden.html',
      'src/html/baguio_museum.html',
      'src/html/SM.html',
      'src/html/st_vincent.html',
      'src/html/sunshine.html',
      'src/html/the_mansion.html',
      'src/html/wright_park.html',
      'src/images/churches/cathedral1.jpg',
      'src/images/churches/holyfamilychurch1.jpg',
      'src/images/churches/lourdeskisad1.jpg',
      'src/images/churches/pinksis1.JPG',
      'src/images/churches/saintvincentchurch1.jpg',
      'src/images/icons/logo1px.png',
      'src/images/icons/logo3px.png',
      'src/images/icons/logo4px.png',  
       'src/images/Market/pasalubong1.jpg',
      'src/images/Market/pasalubong2.jpg',
      'src/images/Market/pasalubong3.jpg',
      'src/images/Market/SM1.jpg',
      'src/images/museum/aguinaldo4.JPG',
      'src/images/museum/baguiomuseum4.jpg',
      'src/images/museum/bellhouse.jpg',
      'src/images/museum/up1.jpg',
      'src/images/park/bellampi1.jpg',
      'src/images/park/bellchurch1.jpg',
      'src/images/park/botanicalgarden1.jpg',
      'src/images/park/christmas1.jpg',
      'src/images/park/igorot1.JPG',
      'src/images/park/johnhay2.jpg',
      'src/images/park/mansion1.jpg',
      'src/images/park/minesview1.jpg',
      'src/images/park/orchidarium1.jpg',
      'src/images/park/panagbengapark1.jpg',
      'src/images/park/sunshine1.jpg',
      'src/images/baguioback.jpg',
      'src/images/logo.png',
      'src/maps/CHURCHES/cathedral.png',
      'src/maps/CHURCHES/grace_baptist.png',
      'src/maps/CHURCHES/holy_family.png',
      'src/maps/CHURCHES/lourdes_parish.png',
      'src/maps/CHURCHES/pink_sisters.png',
      'src/maps/CHURCHES/seventh_day_adventist.png',
      'src/maps/CHURCHES/st_joseph.png',
      'src/maps/CHURCHES/st_vincent.png',
      'src/maps/CHURCHES/sta_catalina.png',
       'src/maps/MUSEUMS/aguinaldo.png',
      'src/maps/MUSEUMS/baguio_museum.png',
      'src/maps/MUSEUMS/bell_house.png',
      'src/maps/MUSEUMS/museo_kordilyera.png',
      'src/maps/PARKS/bell_ampi.png',
      'src/maps/PARKS/bell_church.png',
      'src/maps/PARKS/botanical_garden.png',
      'src/maps/PARKS/childrens_park.png',
      'src/maps/PARKS/christmas_village.png',
       'src/maps/PARKS/igorot_park.png',
      'src/maps/PARKS/john_hay.png',
      'src/maps/PARKS/malcolm_square.png',
      'src/maps/PARKS/mansion_house.png',
      'src/maps/PARKS/market.png',
      'src/maps/PARKS/mines_view.png',
      'src/maps/PARKS/orchidarium.png',
      'src/maps/PARKS/panagbenga_park.png',
      'src/maps/PARKS/rose_garden.png',
      'src/maps/PARKS/SM.png',
      'src/maps/PARKS/sunshine_park.png',
      'src/maps/PARKS/wright_park.png',
       'src/script/app.js',
      'src/script/main.js',
      'src/script/script.js',
      'src/style/church.css',
      'src/style/main.css',
      'src/style/style.css',
      'src/terminal/Churches/Grace-Baptist.JPG',
      'src/terminal/Churches/Holy-Family-Church.jpg',
      'src/terminal/Churches/Our-Lady-Of-Lourdes.JPG',
      'src/terminal/Churches/Pink-Sisters.JPG',
      'src/terminal/Churches/Saint-Joseph.JPG',
      'src/terminal/Churches/Seventh-Day.JPG',
       'src/terminal/Churches/Sta. Catalina.JPG',
      'src/terminal/Churches/St-Vincent.JPG',
      'src/terminal/Museum/UP.JPG',
      'src/terminal/Museum/Baguio-Museum.JPG',
      'src/terminal/Museum/Bell-House-Museum.JPG',
      'src/terminal/Market/Good-Shepherd.JPG',
      'src/terminal/Market/SM.JPG',
      'src/terminal/Parks/Bell-Ampitheatre.JPG',
       'src/terminal/Parks/Bell-Church.JPG',
      'src/terminal/Parks/Botanical-Garden.JPG',
      'src/terminal/Parks/Christmas-Village.JPG',
      'src/terminal/Parks/Camp-John-Hay.JPG',
      'src/terminal/Parks/Mansion.JPG',
      'src/terminal/Parks/Mines-View.JPG',
       'src/terminal/Parks/Panagbenga-Park.JPG',
      'src/terminal/Parks/SM.JPG',
      'src/terminal/Parks/Sunshine-Park.JPG'
      
  ];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetchAndCache(event.request);
    })
  );
});

function fetchAndCache(url) {
  return fetch(url)
  .then(function(response) {
    // Check if we received a valid response
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return caches.open(CACHE_NAME)
    .then(function(cache) {
      cache.put(url, response.clone());
      return response;
    });
  })
  .catch(function(error) {
    console.log('Request failed:', error);
    // You could return a custom offline 404 page here
  });
}

})();