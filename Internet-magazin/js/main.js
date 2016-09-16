/**
 * Created by Мирослав on 27.07.2016.
 */
$(function () {

    var weels = [
        {   vendor:"Amtel",
            name: "Planet 2P K-250 82T",
            diametr: 14,
            width: 155,
            height: 55,
            season: "Лето",
            id: 1113,
            image: "../img/1113.jpg",
            price: 650
        },
        {vendor:"Dunlop",
            name: "SP Sport 5000 106H",
            diametr: 14,
            width: 155,
            height: 60,
            season: "Лето",
            id: 348,
            image: "../img/348.jpg",
            price: 1200
        },
        {vendor:"Dunlop",
            name: "Grandtrek Sj 6 101Q",
            diametr: 16,
            width: 165,
            height: 65,
            season: "Зима",
            id: 352,
            image: "../img/352.jpg",
            price: 1100
        },
        {vendor:"Dunlop",
            name: "SP Sport 01 84H",
            diametr: 15,
            width: 185,
            height: 55,
            season: "Лето",
            id: 422,
            image: "../img/422.jpg",
            price: 870
        },
        {vendor:"Nokian",
            name: "WR D3 82T",
            diametr: 17,
            width: 175,
            height: 70,
            season: "Зима",
            id: 14,
            image: "../img/14.jpg",
            price: 960
        },
        {vendor:"Nokian",
            name: "Hakkapeliitta 7 82T",
            diametr: 18,
            width: 175,
            height: 75,
            season: "Зима",
            id: 18,
            image: "../img/18.jpg",
            price: 1350
        },
        {vendor:"Nokian",
            name: "Hakkapeliitta 7 шип XL 88T",
            diametr: 14,
            width: 180,
            height: 80,
            season: "Зима",
            id: 34,
            image: "../img/34.jpg",
            price: 1380
        },
        {vendor:"Pirelli",
            name: "Scorpion Zero МО 111V",
            diametr: 15,
            width: 160,
            height: 75,
            season: "Лето",
            id: 536,
            image: "../img/536.jpg",
            price: 2000
        },
        {vendor:"Pirelli",
            name: "Cinturato P4 79T",
            diametr: 14,
            width: 165,
            height: 65,
            season: "Лето",
            id: 887,
            image: "../img/887.jpg",
            price: 1600
        },
        {vendor:"Pirelli",
            name: "P3000 Energy 91T",
            diametr: 18,
            width: 175,
            height: 75,
            season: "Лето",
            id: 932,
            image: "../img/932.jpg",
            price: 1400
        }
    ];
    var filteredArray = [];
    var $main = $('main');

    //Обработка сортировки по производителям
    $('#b2').on('click', function (event) {
        event.preventDefault();
        var arr = [];
        filteredArray = [];
        $("#form2 input:checked").each(function() {
            var val = $(this).val();
            arr = $.grep(weels, function(i) {
                    return i.vendor === val;
            });
            filteredArray = filteredArray.concat(arr);
        });
        showFiltered();
    });

    //Обработка сортировки по Ширине/Высоте/Диаметру/Сезону
    $('#b1').on('click', function (event) {
        event.preventDefault();
        filteredArray = weels;
        $("#form1 option:selected").each(function() {
            var val = $(this).val();
            var selectType = $(this).parent().attr('name');
            if (val) {
                filteredArray = $.grep(filteredArray, function(i) {
                    switch (selectType) {
                        case "width":
                            return i.width == val;
                            break;
                        case "height":
                            return i.height == val;
                            break;
                        case "diametr":
                            return i.diametr == val;
                            break;
                        case "season":
                            return i.season == val;
                            break;
                    };
                });
            };
        });
        showFiltered();
    });

    //Обработка сортировки по Диаметру
    $('.left-side-diametr a').on('click', function (event) {
        event.preventDefault();
        filteredArray = [];
        var val = $(this).text();
        val = +val.substr(0, val.length - 1);
        filteredArray = $.grep(weels, function(i) {
            return i.diametr === val;
        });
        showFiltered();
    });

    //Показать отфильтрованные элементы
    function showFiltered() {
        var filteredHTML = "";
        for (var i of filteredArray) {
            filteredHTML +=
                '<article class="search-element">' +
                    '<div class="search-element-img">' +
                        '<img src="img/' + i.id + '.jpg" height="" width="" alt="' + i.vendor + ' ' + i.name + '" title="' + i.vendor + ' ' + i.name + '">' +
                    '</div>' +
                    '<div class="search-element-data">' +
                        '<p class="search-element-data-vendor">' +
                            '<span>' + i.vendor + '</span>' +
                        '</p>' +
                        '<p class="search-element-data-name">' +
                            '<span>' + i.name + '</span>' +
                        '</p>' +
                        '<p class="search-element-data-width">' +
                            '<span>Ширина профиля: ' + i.width + '</span>' +
                        '</p>' +
                        '<p class="search-element-data-height">' +
                            '<span>Высота профиля: ' + i.height + '</span>' +
                        '</p>' +
                        '<p class="search-element-data-diametr">' +
                            '<span>Диаметр: ' + i.diametr + '</span>' +
                        '</p>' +
                        '<p class="search-element-data-season">' +
                            '<span>Сезон: ' + i.season + '</span>' +
                        '</p>' +
                    '</div>' +
                    '<div class="search-element-more">' +
                        '<span>ПОДРОБНЕЕ</span>' +
                    '</div>' +
                    '<div class="search-element-data-price">' +
                        '<span>' + i.price + ' грн.</span>' +
                    '</div>' +
                '</article>';
        };
        $main.html(filteredHTML);
    };

    //Показать детализировано отдельный элемент
    function showDetales(index) {
        var i = filteredArray[index];
        var detalesHTML = "";
        detalesHTML =
            '<article class="element-detales">' +
                '<div class="element-detales-img">' +
                    '<img src="img/' + i.id + '.jpg" height="" width="" alt="' + i.vendor + ' ' + i.name + '" title="' + i.vendor + ' ' + i.name + '">' +
                '</div>' +
                '<div class="element-detales-data">' +
                    '<p class="element-detales-data-vendor">' +
                        '<span>' + i.vendor + '</span>' +
                    '</p>' +
                    '<p class="element-detales-data-name">' +
                        '<span>' + i.name + '</span>' +
                    '</p>' +
                    '<p class="element-detales-data-width">' +
                        '<span>Ширина профиля: ' + i.width + '</span>' +
                    '</p>' +
                    '<p class="element-detales-data-height">' +
                        '<span>Высота профиля: ' + i.height + '</span>' +
                    '</p>' +
                    '<p class="element-detales-data-diametr">' +
                        '<span>Диаметр: ' + i.diametr + '</span>' +
                    '</p>' +
                    '<p class="element-detales-data-season">' +
                        '<span>Сезон: ' + i.season + '</span>' +
                    '</p>' +
                '</div>' +
                '<div class="element-detales-buy">' +
                    '<span>КУПИТЬ</span>' +
                '</div>' +
                '<div class="element-detales-data-price">' +
                    '<span>' + i.price + ' грн.</span>' +
                '</div>' +
            '</article>';
        $main.html(detalesHTML);
    };

    //Обработчик кнопки "Подробнее"
    $main.on("click", ".search-element-more", function () {
        var index = $('div .search-element-more').index(this);
        showDetales(index);
    });
});