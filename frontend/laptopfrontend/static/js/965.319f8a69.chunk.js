"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[965],{1965:(e,a,s)=>{s.r(a),s.d(a,{default:()=>Z});var r=s(2791),n=s(7689),t=s(9508);const c="Process_container__WO4FJ",i="Process_title__8+xtS",o="Process_rankcard__+-7qd",l="Process_laptop_img__grDsN",_="Process_modelContainer__Hvr7N",m="Process_model_title__JKkcZ",d="Process_model_description__-o9Ho",p="Process_robot__HAywm",g="Process_company_name__GBzQM",F="Process_company_address__tNy8P",u="Process_process_container__Pg-4W",h="Process_next__Y1haa",x="Process_stepContainer__1tasN",b="Process_step_img__7wA2e",N="Process_active__6t2ci",k="Process_step_dec__xUbOm",v="Process_arrow__kxuNc",y="Process_grayscale__bRj0U",j="Process_button_group__M4Qsk",C="Process_prev_btn__EuQSa";var P=s(3885),w=s(7152),E=s(7217),B=s(3329);const Z=e=>{const a=(0,n.s0)(),s=[{imageName:"step_1.png",label:"\uc2e0\uccad\uc11c \uc791\uc131"},{imageName:"step_2.png",label:"\ub9e4\uc785\uac00 \uc548\ub0b4"},{imageName:"step_3.png",label:"\uc785\uae08"}],Z=(0,n.TH)(),{totalRank:f,frontImage:D,id:S}=Z.state,{isLoading:A,sendRequest:H,clearError:I}=(0,t.x)(),[M,Q]=(0,r.useState)({});return(0,r.useEffect)((()=>{window.scrollTo(0,0);(async()=>{try{const e=await H("http://localhost:8000/sell/process/".concat(S)),a=new Date(e.create_date),s={device_name:e.device_name,serial_number:e.serial_numer,year:a.getFullYear(),month:(a.getMonth()+1).toString().padStart(2,"0"),date:a.getDate().toString().padStart(2,"0"),step:e.step};Q(s)}catch(e){console.error("Error while sending data to the server:",e)}})()}),[]),(0,B.jsxs)("div",{className:c,children:[(0,B.jsx)(P.Z,{title:"\uc9c4\ud589 \uc0c1\ud669",className:i,children:"\ub0b4 \ub178\ud2b8\ubd81\uc758 \ub4f1\uae09 \uce21\uc815 \uc0c1\ud669"}),(0,B.jsxs)("div",{className:_,children:[(0,B.jsx)(w.Z,{img:D,rank:"rank_".concat(f),className:o,imgclass:l,customImgStyle:{width:"290px",height:"174px"}}),(0,B.jsx)("p",{className:m,children:M.device_name}),(0,B.jsxs)("p",{className:d,children:["\ubaa8\ub378\uba85: ",M.serial_number," ",(0,B.jsx)("br",{})," \ub4f1\ub85d\uc77c:"," ","".concat(M.year,". ").concat(M.month,". ").concat(M.date)]})]}),(0,B.jsx)("img",{src:"/img/process/robot.png",alt:"robot",className:p}),(0,B.jsx)("div",{className:g,children:"(\uc8fc)\ub3c4\uad6c\ubaa8\uc74c"}),(0,B.jsx)("div",{className:F,children:"\uc11c\uc6b8\ud2b9\ubcc4\uc2dc \uac15\ub0a8\uad6c \ubd09\uc740\uc0ac\ub85c454 (\uae08\ud0c1\ud0c0\uc6cc) 2\uce35"}),(0,B.jsx)("div",{className:u,children:s.map(((e,a)=>(0,B.jsxs)("div",{className:h,children:[(0,B.jsxs)("div",{className:x,children:[(0,B.jsx)("img",{src:"/img/process/".concat(e.imageName),alt:"StepImage ".concat(a+1),className:"".concat(a>=M.step?y:""," ").concat(b)}),a>=M.step?(0,B.jsx)("img",{src:"/img/process/step_inactive.png",alt:"step_inactive",className:N}):(0,B.jsx)("img",{src:"/img/process/step_active.png",alt:"step_active",className:N}),(0,B.jsx)("span",{className:"".concat(a>=M.step?y:""," ").concat(k),children:e.label})]}),a===s.length-1?null:(0,B.jsx)("img",{src:"/img/process/arrow.png",alt:"StepArrow",className:"".concat(a>=M.step?y:""," ").concat(v)})]},a)))}),(0,B.jsxs)("div",{className:j,children:[(0,B.jsx)(E.Z,{active:!1,className:C,onClick:()=>a("/purchaseform"),children:"\uc774\uc804\uc73c\ub85c"}),(0,B.jsx)(E.Z,{active:!0,className:C,onClick:()=>a("/main/rating"),children:"\ub2e4\ub978 \ub178\ud2b8\ubd81 \ubcf4\uae30"})]})]})}},7152:(e,a,s)=>{s.d(a,{Z:()=>o});var r,n=s(168),t=(s(2791),s(3405)),c=s(2683),i=s(3329);const o=e=>{const a=c.ZP.div(r||(r=(0,n.Z)(["\n    border-radius: 10.78px;\n    border: 2.16px solid ",";\n    background-color: ",";\n    position: relative;\n\n    background-image: url(",");\n    background-size: cover; /* \uc774\ubbf8\uc9c0\ub97c \ucee8\ud14c\uc774\ub108\uc5d0 \ub9de\uac8c \uc870\uc808 */\n    background-position: center; /* \uc774\ubbf8\uc9c0\ub97c \uac00\uc6b4\ub370 \uc815\ub82c */\n\n    .laptop_img {\n      @media screen and (max-width: 768px) {\n        width: 244px;\n        height: 186px;\n      }\n      width: 292px;\n      height: 223px;\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      border-radius: 10.78px;\n      transform: translate(-50%, -50%);\n    }\n\n    .rank_img {\n      @media screen and (max-width: 768px) {\n        width: 56px;\n        height: 56px;\n      }\n      position: absolute;\n      bottom: 0;\n      right: 0;\n      transform: translate(50%, 50%);\n    }\n  "])),t.Z.primary_80,t.Z.primary_20,e.img);return(0,i.jsxs)(a,{className:"".concat(e.className),children:[(0,i.jsx)("img",{src:"/img/result/".concat(e.rank,".png"),alt:"rank ".concat(e.rank),className:"rank_img"}),e.children]})}},3885:(e,a,s)=>{s.d(a,{Z:()=>t});var r=s(2791),n=s(3329);const t=e=>(0,n.jsxs)(r.Fragment,{children:[(0,n.jsx)("div",{className:"pagetitle_title center ".concat(e.className),children:e.title}),(0,n.jsx)("div",{className:"pagetitle_guide center ".concat(e.className),children:e.children})]})},7217:(e,a,s)=>{s.d(a,{Z:()=>c});var r=s(2791),n=s(3405),t=s(3329);const c=e=>((0,r.useEffect)((()=>{document.documentElement.style.setProperty("--rankColor",n.Z.primary_100),document.documentElement.style.setProperty("--buttonColor",n.Z.primary_80)}),[]),(0,t.jsx)("button",{className:"button ".concat(e.active?"active_button":"inactive_button"," ").concat(e.className),onClick:e.onClick,children:e.children}))},3405:(e,a,s)=>{s.d(a,{Z:()=>r});const r={neutral_100:"#030303",neutral_90:"#1A1A1A",neutral_80:"#333333",neutral_70:"#4D4D4D",neutral_60:"#4D4D4D",neutral_50:"#808080",neutral_40:"#999999",neutral_30:"#B3B3B3",neutral_20:"#CCCCCC",neutral_10:"#E6E6E6",neutral_5:"#F3F3F3",white:"#FFFFFF",primary_100:"#4F80FF",primary_90:"#618DFF",primary_80:"#759CFF",primary_70:"#85A7FF",primary_60:"#9EB9FF",primary_50:"#B2C8FF",primary_40:"#C7D7FF",primary_30:"#E0E9FF",primary_20:"#F0F4FF",primary_10:"#F5F8FF",primary_5:"#FAFBFF",line_blue:"#99BDFF",line_main:"#E6E6E6",line_light:"#F3F3F3",background_100:"#666666",background_50:"rgba(34, 34, 34, 0.3)",background:"#B5B5B5",background_main:"#FAFAFF",background_blue:"#F5F8FF",warning:"#FF4848",success:"#759CFF",rank_SS:"#F0F4FF",rank_S:"#759CFF",rank_A:"#FFC806",rank_B:"#B3B3B3",rank_C:"#DDCC93"}}}]);
//# sourceMappingURL=965.319f8a69.chunk.js.map