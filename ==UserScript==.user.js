// ==UserScript==
// @name         SRail 버튼 자동 클릭
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  SRail 페이지에서 버튼을 자동으로 클릭합니다.
// @author       당신의 이름
// @match        https://etk.srail.kr/hpg/hra/01/selectScheduleList.do*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 팝업 창 생성
    function createPopup() {
        var popupDiv = document.createElement('div');
        popupDiv.style.position = 'fixed';
        popupDiv.style.top = '50%';
        popupDiv.style.left = '50%';
        popupDiv.style.transform = 'translate(-50%, -50%)';
        popupDiv.style.backgroundColor = 'white';
        popupDiv.style.padding = '20px';
        popupDiv.style.border = '1px solid black';
        popupDiv.style.zIndex = '9999';
        popupDiv.innerHTML = `
            <h2>버튼 선택</h2>
            <button id="btn1">버튼 1</button>
            <button id="btn2">버튼 2</button>
            <button id="btn3">버튼 3</button>
            <button id="btn4">버튼 4</button>
        `;
        document.body.appendChild(popupDiv);

        // 버튼 클릭 시 이벤트 추가
        document.getElementById('btn1').addEventListener('click', function() {
            clickButton(1);
        });
        document.getElementById('btn2').addEventListener('click', function() {
            clickButton(2);
        });
        document.getElementById('btn3').addEventListener('click', function() {
            clickButton(3);
        });
        document.getElementById('btn4').addEventListener('click', function() {
            clickButton(4);
        });
    }

    // 선택한 버튼 클릭 함수
    function clickButton(buttonNumber) {
        var xpath = `//*[@id="result-form"]/fieldset/div[6]/table/tbody/tr[${buttonNumber}]/td[7]/a/span`;
        var button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (button) {
            button.click();
        }
        // 팝업 닫기
        closePopup();
    }

    // 팝업 닫기 함수
    function closePopup() {
        var popupDiv = document.getElementById('popupDiv');
        if (popupDiv) {
            popupDiv.remove();
        }
    }

    // 조회하기 버튼을 1초마다 클릭하는 함수
    function clickSearchButton() {
        var searchButton = document.evaluate('//input[@value="조회하기"]', document, null, XPathResult
            .FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (searchButton) {
            searchButton.click();
        }
    }

    // 팝업 열기
    createPopup();

    // 조회하기 버튼을 1초마다 클릭합니다.
    setInterval(clickSearchButton, 1000);
})();