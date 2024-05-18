"use client"

// const create_top_leaderboard = function () {
//     let holder_div = document.createElement('div');
//     // holder_div.style.width = '100%';
//     // holder_div.style.height = '100%';
//     holder_div.style.zIndex = '99';

//     let div_id = document.createElement("div");
//     div_id.id = "mmt-8b838b1c-fee7-47ee-b184-85567357ae92";
//     // div_id.style.width = '200px';
//     // div_id.style.height = '400px';
//     // div_id.style.backgroundColor = 'red';
//     holder_div.appendChild(div_id);

//     const script_holder = '<script type="text/javascript" data-cfasync="false">$MMT = window.$MMT || {}; $MMT.cmd = $MMT.cmd || [];$MMT.cmd.push(function(){ $MMT.display.slots.push(["8b838b1c-fee7-47ee-b184-85567357ae92"]); })</script>';
//     const fragment = document.createRange().createContextualFragment(script_holder);
//     holder_div.appendChild(fragment);
//     return holder_div;
// }
// const create_footer_in_screen = function () {
//     let holder_div = document.createElement('div');
//     holder_div.style.zIndex = '99';

//     let div_id = document.createElement("div");
//     div_id.id = "75d48844-8682-49a7-88e1-4b0c2f910d85";
//     // div_id.style.width = '200px';
//     // div_id.style.height = '400px';
//     // div_id.style.backgroundColor = 'red';
//     holder_div.appendChild(div_id);

//     const script_holder = '<script type="text/javascript" data-cfasync="false">$MMT = window.$MMT || {}; $MMT.cmd = $MMT.cmd || [];$MMT.cmd.push(function(){ $MMT.display.slots.push(["75d48844-8682-49a7-88e1-4b0c2f910d85"]); })</script>';
//     const fragment = document.createRange().createContextualFragment(script_holder);
//     holder_div.appendChild(fragment);
//     return holder_div;
// }



const create_rightPillar_flex = function () {
    let holder_div = document.createElement('div');
    holder_div.style.zIndex = '99';

    let div_id = document.createElement("div");
    div_id.id = "mmt-34313a9b-cd87-458f-a4c0-86ffb8000bcb";

    // div_id.style.width = '200px';
    // div_id.style.height = '600px';
    // div_id.style.backgroundColor = 'red';
    holder_div.appendChild(div_id);

    const script_holder = '<script type="text/javascript" data-cfasync="false">$MMT = window.$MMT || {}; $MMT.cmd = $MMT.cmd || [];$MMT.cmd.push(function(){ $MMT.display.slots.push(["34313a9b-cd87-458f-a4c0-86ffb8000bcb"]); });</script>';
    const fragment = document.createRange().createContextualFragment(script_holder);
    holder_div.appendChild(fragment);
    return holder_div;
}
const create_rightPillar_160 = function () {
    let holder_div = document.createElement('div');
    holder_div.style.zIndex = '99';

    let div_id = document.createElement("div");
    div_id.id = "mmt-2fd46f54-877d-4253-b8e9-3d94a7703d59";

    // div_id.style.width = '200px';
    // div_id.style.height = '600px';
    // div_id.style.backgroundColor = 'red';
    holder_div.appendChild(div_id);

    const script_holder = '<script type="text/javascript" data-cfasync="false">$MMT = window.$MMT || {}; $MMT.cmd = $MMT.cmd || [];$MMT.cmd.push(function(){ $MMT.display.slots.push(["2fd46f54-877d-4253-b8e9-3d94a7703d59"]); });</script>';
    const fragment = document.createRange().createContextualFragment(script_holder);
    holder_div.appendChild(fragment);
    return holder_div;
}
const create_in_content_flex = function () {
    let holder_div = document.createElement('div');
    holder_div.style.zIndex = '99';

    let div_id = document.createElement("div");
    div_id.id = "mmt-cb211802-3e88-4915-a21b-2982de4b3e62";

    // div_id.style.width = '320px';
    // div_id.style.height = '100px';
    // div_id.style.backgroundColor = 'red';
    holder_div.appendChild(div_id);

    const script_holder = '<div id="mmt-cb211802-3e88-4915-a21b-2982de4b3e62"></div><script type="text/javascript" data-cfasync="false">$MMT = window.$MMT || {}; $MMT.cmd = $MMT.cmd || [];$MMT.cmd.push(function(){ $MMT.display.slots.push(["cb211802-3e88-4915-a21b-2982de4b3e62"]); });</script>';
    const fragment = document.createRange().createContextualFragment(script_holder);
    holder_div.appendChild(fragment);
    return holder_div;
}



import helper from '../util/helper.js';
import { useRef, useEffect } from 'react';
export default function Ad_Comp() {
    const setup_started = useRef(false) // gets assigned to a root node

    useEffect(() => {

        if (setup_started.current) return;
        const setup_function_right_pillar = async () => {
            setup_started.current = true;
            const right_pillar = document.getElementById('right_pillar');
            if(!right_pillar){
                return;
            }
            const children = right_pillar.children;
            if (children.length > 0) {
                for (let i = 0; i < children.length; i++) {
                    right_pillar.removeChild(children[i]);
                }
                await helper.sleep(0.1);
            }

            // const new_element = document.createElement("div");
            const new_element = create_rightPillar_flex();
            // new_element.style.backgroundColor = 'yellow';
            right_pillar.appendChild(new_element);
        }
        setup_function_right_pillar();


        const setup_function_right_pillar160 = async () => {
            setup_started.current = true;
            const right_pillar = document.getElementById('right_pillar_160');
            if(!right_pillar){
                return;
            }
            const children = right_pillar.children;
            if (children.length > 0) {
                for (let i = 0; i < children.length; i++) {
                    right_pillar.removeChild(children[i]);
                }
                await helper.sleep(0.1);
            }

            const new_element = create_rightPillar_160();
            right_pillar.appendChild(new_element);
        }
        setup_function_right_pillar160();

        const setup_function_in_content_flex = async () => {
            setup_started.current = true;
            const in_content_flex = document.getElementById('in_content_flex');
            if(!in_content_flex){
                return;
            }
            const children = in_content_flex.children;
            if (children.length > 0) {
                for (let i = 0; i < children.length; i++) {
                    in_content_flex.removeChild(children[i]);
                }
                await helper.sleep(0.1);
            }

            const new_element = create_in_content_flex();
            in_content_flex.appendChild(new_element);
        }
        setup_function_in_content_flex();

        return;

        const setup_function_leaderboard = async () => {
            setup_started.current = true;
            const top_leader_board = document.getElementById('top_leaderboard');
            const children = top_leader_board.children;
            if (children.length > 0) {
                for (let i = 0; i < children.length; i++) {
                    top_leader_board.removeChild(children[i]);
                }
                await helper.sleep(0.1);
            }

            // const new_element = document.createElement("div");
            const new_element = create_top_leaderboard();
            // new_element.style.backgroundColor = 'yellow';
            top_leader_board.appendChild(new_element);
        }
        setup_function_leaderboard();

   
        const setup_function_footer_in_screen = async () => {
            setup_started.current = true;
            const footer_in_screen = document.getElementById('footer_in_screen');
            const children = footer_in_screen.children;
            if (children.length > 0) {
                for (let i = 0; i < children.length; i++) {
                    footer_in_screen.removeChild(children[i]);
                }
                await helper.sleep(0.1);
            }

            const new_element = create_footer_in_screen();
            footer_in_screen.appendChild(new_element);
        }
        setup_function_footer_in_screen();
    }, []);

    return <></>
}