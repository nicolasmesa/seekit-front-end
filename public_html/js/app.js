$(document).ready(function() {
    var homeViews = $('.x-slider.x-home-view'),
            emailViews = $('.x-slider.x-email-view'),
            whenWhereView = $('.x-when-where-view'),
            lostDescription = $('.x-lost-description-view'),
            lostHolder = $('.x-lost-holder'),
            lostSuccess = $('.x-lost-success-view'),
            dateField = $('#date'),
            nameField = $('#name'),
            addLostButton = $('#add-lost-button'),
            lostAdderLi = $('#lost-adder'),
            emailButton = $('.x-email-button'),
            whenWhereButton = $('.x-when-where-button'),
            lostDescriptionButton = $('.x-lost-description-button');


    dateField.datepicker();

    nameField.keypress(onNameFieldChange);

    lostHolder.click(onLostHolderClick);
    emailButton.click(onEmailButtonClick);
    whenWhereButton.click(onWhenWhereButtonClick);
    addLostButton.click(onAddLostButtonClick);
    lostDescriptionButton.click(onLostDescriptionButtonClick);

    var mainObj = {
        action: '',
        lost: [
            homeViews,
            emailViews,
            whenWhereView,
            lostDescription,
            lostSuccess
        ],
        found: [],
        history: [],
        nameCounter: 1
    };



    function onLostHolderClick() {
        mainObj.action = 'lost';

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

        next(whenWhereView);
    }
    
    function onLostDescriptionButtonClick(){
        next(lostDescription);
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
            if (nameField.val() && /iphone/.test(nameField.val().toLowerCase())) {
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
    
    function onAddLostButtonClick(){
        var elHtml = [
            '<li>',
            '<div class="x-input-holder">',
            '<div class="x-preinput x-case"></div>',
            '<input class="x-lost-feature" type="text" name="lost-feature-' + mainObj.nameCounter + '" placeholder="Description"/>',
            '</div>',
            '</li> '
        ].join('');
        
        $(elHtml).insertBefore(lostAdderLi);
    }
});