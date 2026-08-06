import { useState, useEffect } from 'react'
import MainBtn from './Button';
import './Hankki.css'

function Home() {
    return (
        <>
            <header className="header"></header>
            <main className="main bg-[#5B7E3C] leading-[1.3]">
                <section className="sec-main container">
                    <div className="inner py-[100px] px-[20px]">
                        <h1 className="font-SSE text-center text-6xl text-[#1D1D1D]">오늘의 한끼</h1>
                        <div className="w-full mt-[70px] border-2 border-[#A2CB8B] bg-[#fff] rounded-3xl">
                            <ul className="">
                                <li>샌드위치</li>
                                <li>치킨</li>
                                <li>햄버거</li>
                                <li>비빔밥</li>
                                <li>짜장면</li>
                            </ul>
                        </div>
                        <MainBtn></MainBtn>
                    </div>
                </section>
            </main>
            <footer></footer>
        </>
    )
}

export default Home