export = Main;

module Main {
    export interface Source {
        x: number;
        y: number;
        z: number;
        name: string;
        urls?: Array<string>;
        bent?: "liberal" | "conservative" | "center";
        angle?: "reasonable" | "exaggerated" | "center";
        fillColor?: "#a500ff" | "#ff0090" | "#ff0000" | "#0019ff" | "#ffe100";
    }

    export function getAll(): Array<Source> {
        return [
            // Liberal/Reasonable
            {
                x: -10, y: 90, z: 1, name: 'SlateStar',
                urls: [
                    "http://slatestarcodex.com/"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -20, y: 83, z: 0, name: 'BBC',
                urls: [
                    "http://www.bbc.com"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -15, y: 83, z: 0, name: 'Al-J',
                urls: [
                    "http://www.aljazeera.com/"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -70, y: 67, z: 0, name: 'Freddie DeBoer',
                urls: [
                    "http://fredrikdeboer.com"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -18, y: 70, z: 0, name: 'NYT',
                urls: [
                    "http://www.nytimes.com/"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -23, y: 56, z: 0, name: 'NPR',
                urls: [
                    "http://www.npr.org/"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -30, y: 49, z: 0, name: 'New Yorker',
                urls: [
                    "http://www.newyorker.com/"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -5, y: 50, z: 0, name: 'Politico',
                urls: [
                    "http://www.politico.com/"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -75, y: 40, z: 0, name: 'New Inquiry',
                urls: [
                    "http://thenewinquiry.com/"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -10, y: 37, z: 0, name: 'WaPo',
                urls: [
                    "https://www.washingtonpost.com/"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -1, y: 47, z: 0, name: 'RCP',
                urls: [
                    "http://www.realclearpolitics.com/"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -80, y: 30, z: 0, name: 'Jacobin',
                urls: [
                    "https://www.jacobinmag.com/"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -33, y: 35, z: 0, name: 'Atlantic',
                urls: [
                    "https://www.theatlantic.com/"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -10, y: 33, z: 0, name: 'LATimes',
                urls: [
                    "http://www.latimes.com/"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -33, y: 20, z: 0, name: 'TPM',
                urls: [
                    "http://talkingpointsmemo.com/"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -15, y: 18, z: 0, name: 'Chicago Tribune',
                urls: [
                    "http://www.chicagotribune.com/"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            {
                x: -43, y: 5, z: 0, name: 'Guardian',
                urls: [
                    "https://www.theguardian.com"
                ],
                bent: "liberal",
                angle: "reasonable",
                fillColor: "#a500ff"
            },
            // Liberal exaggerated
            {
                x: -90, y: -5, z: 0, name: 'Infoshop',
                urls: [
                    "http://infoshop.org/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -40, y: -7, z: 0, name: 'Slate',
                urls: [
                    "http://www.slate.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -19, y: -10, z: 0, name: 'RT',
                urls: [
                    "https://www.rt.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -12, y: -12, z: 0, name: 'NetJournal',
                urls: [
                    "http://www.netjournals.org/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -20, y: -22, z: 0, name: 'MSNBC',
                urls: [
                    "http://www.msnbc.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -25, y: -26, z: 0, name: 'Mic',
                urls: [
                    "https://mic.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -37, y: -30, z: 0, name: 'NY Mag',
                urls: [
                    "http://nymag.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -30, y: -35, z: 0, name: 'NewRepublic',
                urls: [
                    "https://newrepublic.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -34, y: -39, z: 0, name: 'HuffPo',
                urls: [
                    "http://www.huffingtonpost.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -75, y: -42, z: 0, name: 'Mother Jones',
                urls: [
                    "http://www.motherjones.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -8, y: -44, z: 0, name: 'CNN',
                urls: [
                    "http://www.cnn.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -43, y: -47, z: 0, name: 'ArsTechnica',
                urls: [
                    "http://arstechnica.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -70, y: -49, z: 0, name: 'Thinkprogress',
                urls: [
                    "https://thinkprogress.org/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -33, y: -50, z: 0, name: 'VICE',
                urls: [
                    "https://news.vice.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -40, y: -54, z: 0, name: 'Rolling Stone',
                urls: [
                    "http://www.rollingstone.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -6, y: -56, z: 0, name: 'Biz. Insider',
                urls: [
                    "http://www.businessinsider.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -95, y: -58, z: 0, name: 'Critical-Theory',
                urls: [
                    "http://www.critical-theory.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -30, y: -63, z: 0, name: 'Vox',
                urls: [
                    "http://www.vox.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -24, y: -66, z: 0, name: 'DailyBeast',
                urls: [
                    "http://www.thedailybeast.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -60, y: -70, z: 0, name: 'XoJane',
                urls: [
                    "http://www.xojane.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -27, y: -71, z: 0, name: 'Independent',
                urls: [
                    "http://www.independent.co.uk"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -31, y: -73, z: 0, name: 'Gawker',
                urls: [
                    "http://gawker.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -46, y: -74, z: 0, name: 'Rawstory',
                urls: [
                    "http://www.rawstory.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            //{ x: -5, y: -75, z: 0, name: 'Examiner' }, // What's the paper?
            {
                x: -64, y: -77, z: 0, name: 'Jezebel',
                urls: [
                    "http://jezebel.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -33, y: -78, z: 0, name: 'Upworthy',
                urls: [
                    "https://www.upworthy.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -24, y: -82, z: 0, name: 'Mary Sue',
                urls: [
                    "http://www.themarysue.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -78, y: -85, z: 0, name: 'Salon',
                urls: [
                    "http://www.salon.com/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            {
                x: -55, y: -97, z: 0, name: 'The Toast',
                urls: [
                    "http://the-toast.net/"
                ],
                bent: "liberal",
                angle: "exaggerated",
                fillColor: "#0019ff"
            },
            // Center
            {
                x: 0, y: 0, z: 0, name: 'USA Today',
                urls: [
                    "http://www.usatoday.com/"
                ],
                bent: "center",
                angle: "center",
                fillColor: "#ffe100"
            },
            // Conservative reasonable
            {
                x: 33, y: 95, z: 0, name: 'American Conservative',
                urls: [
                    "http://www.theamericanconservative.com/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            {
                x: 66, y: 90, z: 0, name: 'Future Primaeval',
                urls: [
                    "http://thefutureprimaeval.net/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            {
                x: 30, y: 83, z: 0, name: 'MargRev',
                urls: [
                    "http://marginalrevolution.com/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            {
                x: 1, y: 77, z: 0, name: 'Economist',
                urls: [
                    "http://www.economist.com/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            {
                x: 35, y: 73, z: 0, name: 'Mitrailleuse',
                urls: [
                    "http://mitrailleuse.net/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            {
                x: 2, y: 70, z: 0, name: 'WSJ',
                urls: [
                    "http://www.wsj.com/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            //{ x: 20, y: 63, z: 0, name: 'Ethika' }, // What's this?
            {
                x: 70, y: 62, z: 0, name: 'Social Matter',
                urls: [
                    "http://www.socialmatter.net/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            {
                x: 41, y: 58, z: 0, name: 'First Things',
                urls: [
                    "https://www.firstthings.com/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            {
                x: 28, y: 53, z: 0, name: 'New Criterion',
                urls: [
                    "http://www.newcriterion.com/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            {
                x: 15, y: 33, z: 0, name: 'Telegraph',
                urls: [
                    "http://www.telegraph.co.uk/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            //{ x: 54, y: 26, z: 0, name: 'Aospades' }, // What's this?
            {
                x: 16, y: 24, z: 0, name: 'WaEx',
                urls: [
                    "http://www.washingtonexaminer.com/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            {
                x: 21, y: 20, z: 0, name: 'Reason',
                urls: [
                    "https://reason.com/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            {
                x: 4, y: 18, z: 0, name: 'Spiked',
                urls: [
                    "http://www.spiked-online.com/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            {
                x: 31, y: 14, z: 0, name: 'CityAM WORLD',
                urls: [
                    "http://www.cityam.com/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            {
                x: 67, y: 10, z: 0, name: 'Unz',
                urls: [
                    "http://www.unz.com/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            {
                x: 22, y: 5, z: 0, name: 'NY Post',
                urls: [
                    "http://nypost.com/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            //{ x: 19, y: 3, z: 0, name: 'Am.Interest' }, // what is this?
            {
                x: 45, y: 2, z: 0, name: 'Federalist',
                urls: [
                    "http://thefederalist.com/"
                ],
                bent: "conservative",
                angle: "reasonable",
                fillColor: "#ff0090"
            },
            // Conservative exaggerated
            {
                x: 28, y: -5, z: 0, name: 'Daily Signal',
                urls: [
                    "http://dailysignal.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 66, y: -8, z: 0, name: 'Taki',
                urls: [
                    "http://takimag.com"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 38, y: -10, z: 0, name: 'WaTimes',
                urls: [
                    "http://www.washingtontimes.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 50, y: -15, z: 0, name: 'American Thinker',
                urls: [
                    "http://www.americanthinker.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 26, y: -17, z: 0, name: 'NRO',
                urls: [
                    "http://www.nationalreview.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 39, y: -20, z: 0, name: 'Nat Interest',
                urls: [
                    "http://nationalinterest.org/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 24, y: -25, z: 0, name: 'Fox',
                urls: [
                    "http://www.foxnews.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 65, y: -26, z: 0, name: 'Crisis',
                urls: [
                    "http://www.crisismagazine.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 42, y: -31, z: 0, name: 'Dailycaller',
                urls: [
                    "http://dailycaller.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 16, y: -32, z: 0, name: 'Hotair',
                urls: [
                    "http://hotair.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 53, y: -37, z: 0, name: 'Breitbart',
                urls: [
                    "http://www.breitbart.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 8, y: -42, z: 0, name: 'Dailymail',
                urls: [
                    "http://www.dailymail.co.uk"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 32, y: -45, z: 0, name: 'Wkly.Standard',
                urls: [
                    "http://www.weeklystandard.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 20, y: -47, z: 0, name: 'Drudge',
                urls: [
                    "http://www.drudgereport.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 34, y: -50, z: 0, name: 'The Blaze',
                urls: [
                    "http://www.theblaze.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 85, y: -51, z: 0, name: 'Radix',
                urls: [
                    "http://www.radixjournal.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 10, y: -57, z: 0, name: 'IJReview',
                urls: [
                    "http://ijr.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 26, y: -59, z: 0, name: 'RedState',
                urls: [
                    "http://www.redstate.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 50, y: -64, z: 0, name: 'FreeBeacon',
                urls: [
                    "http://freebeacon.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 19, y: -70, z: 0, name: 'Zerohedge',
                urls: [
                    "http://www.zerohedge.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 54, y: -75, z: 0, name: 'WorldNetDaily',
                urls: [
                    "http://www.wnd.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 15, y: -80, z: 0, name: 'Intellihub',
                urls: [
                    "https://www.intellihub.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            },
            {
                x: 16, y: -99, z: 0, name: 'Infowars',
                urls: [
                    "http://www.infowars.com/"
                ],
                bent: "conservative",
                angle: "exaggerated",
                fillColor: "#ff0000"
            }
        ]
    }
}