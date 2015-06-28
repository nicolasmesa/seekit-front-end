$(document).ready(function() {
    var homeViews = $('.x-slider.x-home-view'),
            emailViews = $('.x-slider.x-email-view'),
            loserWhenWhereView = $('.x-when-where-view.x-loser'),
            lostDescription = $('.x-description-view.x-loser'),
            lostHolder = $('.x-lost-holder'),
            lostSuccess = $('.x-success-view.x-loser'),
            foundHolder = $('.x-found-holder'),
            finderWhenWhereView = $('.x-when-where-view.x-finder'),
            foundDescription = $('.x-description-view.x-finder'),
            findSuccess = $('.x-success-view.x-finder'),
            dateField = $('#date'),
            nameField = $('#name'),
            addLostButton = $('#add-lost-button'),
            lostAdderLi = $('#lost-adder'),
            emailButton = $('.x-email-button'),
            whenWhereButton = $('.x-when-where-button'),
            descriptionButton = $('.x-description-button');


    dateField.datepicker();

    nameField.keypress(onNameFieldChange);

    lostHolder.click(onLostHolderClick);
    emailButton.click(onEmailButtonClick);
    whenWhereButton.click(onWhenWhereButtonClick);
    addLostButton.click(onAddLostButtonClick);
    descriptionButton.click(onLostDescriptionButtonClick);

    foundHolder.click(onFoundHolderClick);

    var mainObj = {
        action: '',
        lost: [
            homeViews,
            emailViews,
            loserWhenWhereView,
            lostDescription,
            lostSuccess
        ],
        found: [
            homeViews,
            emailViews,
            finderWhenWhereView,
            foundDescription,
            findSuccess
        ],
        history: [],
        nameCounter: 1
    };



    function onLostHolderClick() {
        mainObj.action = 'lost';

        next(homeViews);
    }

    function onFoundHolderClick() {
        mainObj.action = 'found';

        next(homeViews);
    }

    function onEmailButtonClick() {
        var emailField = $('#email'),
                regex = /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]+/;

        if (!regex.test(emailField.val())) {
            alert('Please provide a correct email address');
            return;
        }

        next(emailViews);
    }

    function onWhenWhereButtonClick() {
        var dateField = $('#date'),
                locationField = $('#location');

        if (!dateField.val()) {
            alert('Please select a date');
        }

        if (!locationField.val()) {
            alert('Please add a location');
        }

        if (mainObj.action == 'lost') {
            next(loserWhenWhereView);
        } else {
            next(finderWhenWhereView);
        }
    }

    function onLostDescriptionButtonClick() {
        if (mainObj.action == 'lost') {
            next(lostDescription);
        } else {
            next(foundDescription);
        }
    }

    function next(el) {
        var action = mainObj.action,
                index = mainObj[action].indexOf(el) + 1;

        mainObj.history.push(el);

        if (index < mainObj[action].length) {
            el.hide({
                duration: 1000,
                complete: function() {
                    mainObj[action][index].show({
                        duration: 1000
                    });
                }
            });
        }
    }

    function onNameFieldChange() {
        setTimeout(function() {
            if (nameField.val() && /phone/.test(nameField.val().toLowerCase())) {
                displayPhoneSettings();
            } else {
                hidePhoneSettings();
            }
        }, 100);
    }

    function displayPhoneSettings() {
        $('.phone-settings').show({
            duration: 300
        });
    }

    function hidePhoneSettings() {
        $('.phone-settings').hide();
    }

    function onAddLostButtonClick() {
        var elHtml = [
            '<li>',
            '<div class="x-input-holder">',
            '<div class="x-preinput x-case"></div>',
            '<input class="x-lost-feature" type="text" name="lost-feature-' + mainObj.nameCounter + '" placeholder="Provide description tag"/>',
            '</div>',
            '</li> '
        ].join('');

        $(elHtml).insertBefore(lostAdderLi);
    }
});