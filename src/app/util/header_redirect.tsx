"use client"

/**
 * HeaderRedirect provides the core implementation for the HeaderRedirect routine used in this module.
 *
 * @returns {*} Computed value or rendered markup produced by HeaderRedirect.
 */
export default function HeaderRedirect () {
    return <div
        className="hover"
        style={{ position: 'absolute', top: '0', left: '0', height: "36px", width: '100vw', zIndex: '2' }}
        onClick={() => {
            window.location.href = 'https://www.gameplayplanner.com/page_selection'
        }}>

    </div>
}
