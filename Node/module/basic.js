// Node.js 모듈이란 무엇인가?

// Node.js에서 module은 '필요한 함수들의 집합'을 의미한다.
// 사용하고자 하는 모든 기능을 다 자신이 처음부터 만들어서 사용할 수 없다.
// 그래서 누군가가 이미 만들어 놓은 모듈을 이용해서 사용하면 된다.

// Node.js에서 제공해주는 많은 모듈들을 손쉽게 사용할 수 있다.
// 모듈을 가져와서 사용할 때는 require 모듈을 이용해서 다른 모듈들을 가져올 수 있다.

// 1. Core Module: 코어모듈은 Node.js에서 기본적으로 제공하는(내재되어 있는) 모듈을 의미한다.
// 2. Local Module: 로컬모듈은 Node.js 애플리케이션에서 로컬로 생성된 모듈이다.
// 이러한 모듈은 별도의 파일과 폴더에 애플리케이션의 다양한 기능을 포함한다.

const log = {
    info: function (info) {
        console.log("Info " + info)
    },
    warning: function (warning) {
        console.log("Warning " + warning)
    },
    error: function (error) {
        console.log("Error " + error)
    },
}

module.exports = log

// 3. Third Party Module
// Third Party Module은 NPM(Node Package Manager)을 사용하여 온라인에서 사용할 수 있는 모듈이다.
// 이러한 모듈은 프로젝트 폴더에 설치하거나 전역적으로 설치할 수 있다. 인기 있는 타사 모듈 중 일부는 mongoose, express 이다.
