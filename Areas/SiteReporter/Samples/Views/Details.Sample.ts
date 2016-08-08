import Config = require("../../Config");
import DetailsView = require("../../Views/Details.View");

export = Main;

module Main {
    let facebookParams = $.extend({}, Config.Params.DetailsDefaults);

    let facebookTh2Params = {
        release: "TH2"
    };

    $((): void => {
        setupMockjax();

        let details = new DetailsView.Widget($("#sample"), {
            viewContext: {
                params: $.extend({}, facebookParams)
            }
        });
    });

    export function setupMockjax(): void {
        // Get details for domain
        $.mockjax({
            url: [Config.Urls.SiteReporterApi, Config.Endpoints.DetailsForDomain].join("/"),
            responseText: getMockDetailsForDomain(),
            data: (data) => {
                return data.domain === facebookParams.domain;
            }
        });

        // Get filters
        $.mockjax({
            url: [Config.Urls.SiteReporterApi, Config.Endpoints.Filters].join("/"),
            responseText: getMockFiltersData()
        });

        // Get URL for bugs for domain blob
        $.mockjax({
            url: [Config.Urls.SiteReporterApi, Config.Endpoints.BugsForDomain].join("/"),
            responseText: getMockBugsForDomainBlobUrl(),
            data: (data) => {
                return data.domain === facebookParams.domain;
            }
        });

        // Get bugs for domain blob
        $.mockjax({
            url: getMockBugsForDomainBlobUrl(),
            responseText: getMockBugsForDomain()
        });

        // Get scan time
        $.mockjax({
            url: [Config.Urls.SiteReporterApi, Config.Endpoints.ScanTime].join("/"),
            responseText: "2016-08-05T18:36:21.6588749+00:00"
        });

        // Get builtwith data
        $.mockjax({
            url: [Config.Urls.DetailsPageBase, Config.Endpoints.GetBuildWithData].join("/"),
            responseText: getMockBuiltWithData(),
            data: (data) => {
                return data.domain === facebookParams.domain;
            }
        });

        // Get URL for bug trends for domain blob
        $.mockjax({
            url: [Config.Urls.SiteReporterApi, Config.Endpoints.BugTrends].join("/"),
            responseText: getMockBugTrendsBlobUrl(),
            data: (data) => {
                return data.domain === facebookParams.domain;
            }
        });

        // Get bug trends for domain blob
        $.mockjax({
            url: getMockBugTrendsBlobUrl(),
            responseText: getMockBugTrends()
        });

        // Get trends for domain
        $.mockjax({
            url: [Config.Urls.SiteReporterApi, Config.Endpoints.TrendsForDomain].join("/"),
            responseText: getMockTrendsForDomainDataRs1(),
            data: (data) => {
                return data.domain === facebookParams.domain
                    && data.release === facebookParams.release;
            }
        });

        $.mockjax({
            url: [Config.Urls.SiteReporterApi, Config.Endpoints.TrendsForDomain].join("/"),
            responseText: getMockTrendsForDomainDataTh2(),
            data: (data) => {
                return data.domain === facebookParams.domain
                    && data.release === facebookTh2Params.release;
            }
        });
    }

    export function getMockBugsForDomainBlobUrl(): any {
        return "https://iesitereporter.blob.core.windows.net/domains/bugdetails/facebook.com/rs1?sv=2015-12-11&sr=c&si=readonlypolicy&sig=iwF9pG3aodocqS1umTVv0O6umJM53SDaqO9wEjamy4w%3D";
    }

    export function getMockBugsForDomain(): any {
        return {
            "IsSwitchRisk": true,
            "Bugs": [
                {
                    "Domain": "facebook.com",
                    "Title": "apps.facebook.com : Page goes \"not responding\" as you start playing game. Unable to play game. keeps on hanging.",
                    "Id": 8248297,
                    "Keywords": "interop0",
                    "Tags": "FH_14393; Mindtree; publicregression; RSEdgeScrub2; RSEdgeScrub2_Repro",
                    "AssignedTo": "Ujesh Nambiar",
                    "Triage": "Triage Needed",
                    "State": "Active",
                    "Release": "",
                    "ResolvedReason": "",
                    "Priority": 1,
                    "Severity": 1,
                    "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites",
                    "Product": "Future",
                    "Iteration": "OS\\1607"
                },
                { "Domain": "facebook.com", "Title": "Pinch zoom out not firing resize event", "Id": 107013, "Keywords": "ReducedDate_20140426 REDUCEDBY_mattkot; COMP_FUNC;  Interop1; Edge_TP1_Reviewed; zTop100 zNotorious250", "Tags": "nonhii; RSEdgeScrub1", "AssignedTo": "Matt Rakow", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 1, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\COMP-Composition\\Scrolling Effects", "Product": "Future", "Iteration": "OS\\Future" },
                { "Domain": "facebook.com", "Title": "[Edge F12] DOM - dom tree style attribute doesn't get updated when inline style is changed from style panel", "Id": 5736611, "Keywords": "", "Tags": "dom", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Remove sRGB Color profile detection code in Edge", "Id": 6853978, "Keywords": "BrTriage_160316", "Tags": "Checkbox Promoted; Promoted User Feedback; Screenshot Attached", "AssignedTo": "Rafael Cintron", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 3, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability\\Imaging", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Text input canvas does not move modern App windows to appropriate position", "Id": 7324455, "Keywords": "", "Tags": "Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Amit Jain (IOT)", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Ctrl-V does not work in some Edge textboxes with Continuum hardware keyboard", "Id": 7332638, "Keywords": "", "Tags": "Checkbox Promoted; Promoted User Feedback; TIETRI_Approved; wtmrs", "AssignedTo": "Nirankush Panchbhai", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Unable to open sound cloud links from fb app in edge", "Id": 7562488, "Keywords": "ImpactsFacebook", "Tags": "CE_UIF; Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Patrick Kettner", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites\\Selfhosters", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "[IST_IMP] Microsoft Edge: \"You must enable popups!\" message displayed after Selecting continue with facebook in Pinterest.comSTEPS TO REPRODUCE:1. Launch Browser-> open Pinterest.com website2. Once website is opened, tap on continue with Facebook-> Observ", "Id": 7672208, "Keywords": "", "Tags": "bstfuture; Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Cant close that window...", "Id": 7679936, "Keywords": "", "Tags": "", "AssignedTo": "Ibrahim Orakli", "Triage": "Triage Needed", "State": "Active", "Release": "RS1", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\COMP-Composition", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Edge Seems to Freeze Up Frequently in Build 14361 on Many Common Big Sites (ex: Facebook Live Videos)", "Id": 7880491, "Keywords": "", "Tags": "", "AssignedTo": "Brad Edwards", "Triage": "Triage Needed", "State": "Active", "Release": "RS1", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Depleted commit and graphics issues leading to black screen when IE puts the system under pressure in Windows 10", "Id": 7980207, "Keywords": "W10AdoptionBlocker; gethelp", "Tags": "", "AssignedTo": "Rico Mariani", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Text Pattern is reading content inside opaque elements instead of reading their label", "Id": 8049361, "Keywords": "", "Tags": "", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Links take long time to open in edge", "Id": 8160430, "Keywords": "", "Tags": "Checkbox Promoted; Promoted User Feedback; Screenshot Attached", "AssignedTo": "Rico Mariani", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability\\Feedback", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Edge: facebook.com: Text input box is broken from right end.", "Id": 3676153, "Keywords": "Interop0 BrTriage_150725 BrTriage_150725 reducedby_ujeshn ReducedDate_20150828", "Tags": "Mindtree; nonhii; RSEdgeScrub1; RSEdgeScrub1_Repro; RSEdgeScrub2; RSEdgeScrub2_Repro", "AssignedTo": "Balaji Bhaskar", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "apps.facebook.com: Scrolling is not smooth.", "Id": 4751931, "Keywords": "Interop1 BrTriage_150928 needsreduction ", "Tags": "Edgeflighting_TP13; Edgeflighting_TP19; Mindtree; RSEdgeScrub1; RSEdgeScrub1_Repro; RSEdgeScrub2; RSEdgeScrub2_Repro; TOPFB", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\COMP-Composition", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "facebook.com typing is slow when the CPU is pegged", "Id": 4755478, "Keywords": "Interop1 needsreduction zTop100 zNotorious250", "Tags": "nonhii; RSEdgeScrub1; RSEdgeScrub1_Skipped", "AssignedTo": "Amit Jain (IOT)", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 1, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Narrator: http://facebook.com: Narrator is reading same word in two different ways in two different places", "Id": 5329092, "Keywords": "IndiaAppCompat zTop100 zNotorious250", "Tags": "AccSelfLime; Mindtree; RSEdgeScrub1; RSEdgeScrub1_Skipped", "AssignedTo": "Cynthia Shelly", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "JAWS  Screen Reader : Web Browsing : JAWS fails to read the description of controls in web pages in Microsoft Edge browser", "Id": 5890032, "Keywords": "IndiaAppCompat", "Tags": "AccWiPro; RSEdgeScrub1; RSEdgeScrub1_Skipped", "AssignedTo": "Rossen Atanassov", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Taking Web Note on scrolled Facebook news feed creates weird screenshot issues", "Id": 6249690, "Keywords": "", "Tags": "RSEdgeScrub1; RSEdgeScrub1_Repro", "AssignedTo": "Christian Fortini", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 1, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\REN-Rendering", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "facebook.com : Left panel is flickering on scrolling", "Id": 6361337, "Keywords": "Interop0 BrTriage_160201 NeedsReduction", "Tags": "Edgeflighting_TP19; Mindtree; nonhii; RSEdgeScrub1; RSEdgeScrub1_Repro", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 3, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\REN-Rendering\\Jittery Fixed Elements", "Product": "Redstone", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "[JPN][CONTINUUM] On facebook comment field input string is shown double.", "Id": 6766836, "Keywords": "", "Tags": "AXP_JTOP_Mobile; wtmrs", "AssignedTo": "Amit Jain (IOT)", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing\\IME", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Edge:facebook.com:Image overlapping in page print preview ", "Id": 6989313, "Keywords": "Interop1 reducedby_ujeshn ReducedDate_20160324 BrTriage_160324", "Tags": "Edgeflighting_TP19; Mindtree", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 3, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Buggy text input in Facebook text message input box on phone (desktop version of web site).", "Id": 7184601, "Keywords": "", "Tags": "", "AssignedTo": "Amit Jain (IOT)", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Phone: facebook.com - Edge browser crashes while trying to move the page in News Feed ( FAILURE_BUCKET_ID:  OOM_c00001ad_microsoftedgecp.exe!out_of_memory)", "Id": 7262326, "Keywords": "crash", "Tags": "th2_release_sec.10586.13094.20160305-1200; wipro", "AssignedTo": "Riff Jiang", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability\\Memory", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Facebook.com - Chat window - Spell check line stays on after hitting enter to send message", "Id": 7283817, "Keywords": "", "Tags": "TIETRI_Approved", "AssignedTo": "Grisha Lyukshin", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing\\Spell Checking and Autocorrection", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "OOM_AVRF_c0000602_microsoftedgecp.exe!out_of_memory", "Id": 7296277, "Keywords": "", "Tags": "", "AssignedTo": "Kevin Babbitt", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Phone: Facebook.com : User unable to enter text in the textboxes as the keypad pop ups momentarily", "Id": 7307300, "Keywords": "needsreduction; Rs1_Input_Related interop1", "Tags": "Mindtree; Phone_Edgeflighting_14295; Phone_EdgeFlighting_TP6; Phone_FH_14322; Phone_FH_14328; Phone_FH_14356", "AssignedTo": "Amit Jain (IOT)", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "[Lumia 950] m.facebook.com content realization is slow", "Id": 7434135, "Keywords": "SmoothPanning", "Tags": "", "AssignedTo": "Rico Mariani", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Phone: Facebook.com: The beginning of the text doesn't start with a capital letter on Create Event", "Id": 7443191, "Keywords": "", "Tags": "bstfuture; Mindtree; MRolling100; Rolling100_Phone_TP8; TH2Fix_TP1", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "[IST_IMP] Microsoft Edge: \"101: Requried parameters missing\" message displayed while logging via facebook in jabong.comSTEPS TO REPRODUCE:1. Launch Browser-> Open jabong.com website,Once website is opened2. Tap on sign in-> tap on Facebook->Log in with fa", "Id": 7714033, "Keywords": "", "Tags": "bstfuture; Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Facebook chat region false render upon scrolling down", "Id": 7728219, "Keywords": "", "Tags": "", "AssignedTo": "Ibrahim Orakli", "Triage": "Triage Needed", "State": "Active", "Release": "RS1", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\COMP-Composition", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "On Facebook event page, option to open street address in Maps prompts to install app.", "Id": 7729892, "Keywords": "", "Tags": "bstfuture; CE_UIF; Checkbox Promoted; Promoted User Feedback; Screenshot Attached", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "text selection on facebook search box is not working as expected", "Id": 7884712, "Keywords": "Selection_RevampWorkRelated ImpactsFacebook ", "Tags": "TIETRI_Approved", "AssignedTo": "Amit Jain (IOT)", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Autocorrection in Facebook chat puts the text selection in the middle of the autocorrected word in Microsoft Edge on HoloLens and Continuum", "Id": 7890978, "Keywords": "", "Tags": "bstfuture; Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Narrator : Facebook.com : Narrator sets focus at different place instead on Heading for few headings while navigating in Headings mode", "Id": 7895555, "Keywords": "IndiaAppCompat", "Tags": "AccSelfLime; AccWiPro", "AssignedTo": "Bogdan Brinza", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Narrator : Facebook.com : Narrator reads the items but there is no narrator focus around them", "Id": 7895590, "Keywords": "IndiaAppCompat", "Tags": "AccSelfLime; AccWiPro", "AssignedTo": "Bogdan Brinza", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 3, "Severity": 3, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Narrator : Facebook : Narrator sets focus beside search box and reads as \"Editable text\".", "Id": 7895622, "Keywords": "IndiaAppCompat", "Tags": "AccSelfLime; AccWiPro", "AssignedTo": "Bogdan Brinza", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 1, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "[Microsoft Edge PC]:-[\"Add photos \" option is displayed twice , after deleting the uploaded image in facebook]", "Id": 7918916, "Keywords": "PCTP Experiences;Spartan needsreduction", "Tags": "ac: validation manual - india; COMPAT_TRIAGED; hii; PCTP Experiences", "AssignedTo": "Patrick Kettner", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Phone: facebook: Video thumbnails are not loading", "Id": 7926043, "Keywords": "", "Tags": "bstfuture", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Redstone", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "LastPass extension: Icon overlaps with Edge password/x icons in email/password fields", "Id": 7927537, "Keywords": "", "Tags": "", "AssignedTo": "Chee Chen Tong", "Triage": "Approved by Feature Team", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\ECO-Web Developer Ecosystem\\Partner Outreach", "Product": "Edge Extensions", "Iteration": "OS\\1606" }, { "Domain": "facebook.com", "Title": "Edge doesn't support \"Facebook forgot password option\" with selection \"Use your google account to reset the password\". It stuck at email verified window. I had to use chrome to workaround it.", "Id": 7945817, "Keywords": "needsreduction ImpactsFacebook hii", "Tags": "CE_UIF; Checkbox Promoted; hii; Promoted User Feedback", "AssignedTo": "Kris Krueger", "Triage": "Approved by Feature Team", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 1, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\DOM-Document Object Model", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Phone:Facebook.com :Unable to add the legacy contact on Facebook as keyboard just comes and disappear when tapped on 'Choose a friend' text input field", "Id": 8012182, "Keywords": "", "Tags": "Mindtree; Phone_FH_14372; RedstoneRI_TP54; RedstoneRI_TP55", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "[OUTREACH]: Phone : facebook.com : Images do not fit the mobile viewport properly", "Id": 8012503, "Keywords": "", "Tags": "Adhoc_EmptyDescription; Mindtree; Phone_EdgeFlighting_TP6", "AssignedTo": "Patrick Kettner", "Triage": "Approved by Feature Team", "State": "Active", "Release": "2015", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\ECO-Web Developer Ecosystem\\Partner Outreach", "Product": "Web", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "On facebook.com, while window is of type ContentScriptGlobalScope, top is of type Window", "Id": 8034591, "Keywords": "", "Tags": "EXT_LastPass", "AssignedTo": "Scott Sheehan", "Triage": "Approved by Feature Team", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 0, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Redstone", "Iteration": "OS\\1609" }, { "Domain": "facebook.com", "Title": "Narrator: Facebook.com: Narrator highlights but does not read the names for the textboxes - Last name, Mobile number or email, Re-enter mobile number of email, New password, in Item view", "Id": 8038416, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator: Facebook.com: Narrator highlights but does not read the names for the textboxes - \"First Name\", \"Last Name\", \"Mobile number or email\" and \"Re-enter mobile number or email\" in \"Read from here\" view", "Id": 8038643, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator: Facebook.com: Narrator highlights but does not read the names for Birthday Month, Day and Year dropdowns, in \"Read from here\" view", "Id": 8038734, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator: facebook.com: Clicking enter opens the dropdown menu but does not read the menu items for Settings and Friends dropdown, while narrator is in Item view", "Id": 8039543, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator: facebook.com:Narrator reads but does not highlight the Friend Requests, Messages and Notification icon in the page header, in \"Read from Here\" view", "Id": 8062534, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator: Facebook.com: Narrator does not highlight and read the \"Privacy Shortcuts\" link in the header, in \"Read from Here\" view", "Id": 8062670, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!CAPProcessor::DeferLogEvent", "Id": 8066241, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Edge is not responsive and pages hang a lot that I need to recover multiple tiles. I hit this on Sites like facebook craigslist msn news and others", "Id": 8091687, "Keywords": "", "Tags": "Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Rico Mariani", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability\\Feedback", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: MicrosoftEdge.exe!SpartanXAML::MainPage::ConfigureNavSwipeBackwardPanel", "Id": 8123428, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: MicrosoftEdge.exe!SpartanXAML::MainPage::ConfigureNavSwipeBackwardPanel", "Id": 8124989, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: MicrosoftEdge.exe!SpartanXAML::MainPage::ConfigureNavSwipeBackwardPanel", "Id": 8125111, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "'Show/Display Password' button disappears from Password box after right click.", "Id": 8154457, "Keywords": "", "Tags": "Mindtree", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "facebook: typing inside chat is very slow", "Id": 8155729, "Keywords": "impactsfacebook", "Tags": "TIE_FACEBOOK_CLEAN; TIERS2", "AssignedTo": "Amit Jain (IOT)", "Triage": "Approved by Feature Team", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Redstone", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "facebook.com: Photo Album pop-up window doesn't come up and photo uploading process keeps on running when trying to upload multiple photos.", "Id": 8165624, "Keywords": "Interop0", "Tags": "Mindtree", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Comment editing glitches out on Facebook in Edge", "Id": 8179195, "Keywords": "", "Tags": "CE_UIF; Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "[Phone Only] Edge as Facebook access - cannot type into the new post field when writing to someone else's timeline", "Id": 8210710, "Keywords": "", "Tags": "Checkbox Promoted; Promoted User Feedback; Screenshot Attached", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": null, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: Chakra.dll!Js::InterpreterStackFrame::OP_CallCommon_struct_Js::OpLayoutT_AsmCall_struct_Js::LayoutSizePolicy_0_____", "Id": 8214416, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\Chakra Javascript Engine", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Phone: Facebook.com : Videos posted on timeline not playing inline", "Id": 8221404, "Keywords": "", "Tags": "Mindtree; Phone_FH_14390", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Phone: Facebook.com : Tapping on post button on Facebook will pop up dialog box asking to \" Close the window\"", "Id": 8227829, "Keywords": "", "Tags": "Mindtree; Phone_FH_14393", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Pitch fluctuates during live streaming from Facebook Live", "Id": 8234235, "Keywords": "", "Tags": "", "AssignedTo": "Sermet Iskin", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility\\Flash", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!Tree::HTMLSerializer::SerializeTreeInternal", "Id": 8255794, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!CDestinationManager::CreateDestination_CDispRootDestination,IDispSurfaceBackedLayer,int_", "Id": 8257227, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!URLRequest::get_status", "Id": 8257411, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!CHtmScriptParseCtx::Finish", "Id": 8262009, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!Layout::ReplacedBoxNativeGeneratedImage::ApplyRenderProperties", "Id": 8282169, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: Chakra.dll!AutoFilterExceptionRegion::_AutoFilterExceptionRegion", "Id": 8307658, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\Chakra Javascript Engine", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!GWND::PostWin32MethodCallMessage", "Id": 8192116, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: ASSERT:  scope->HasInnerScopeIndex() (Chakra!ByteCodeGenerator::GetStSlotOp+17b [d:\\a\\_work\\15\\s\\core\\lib\\runtime\\bytecode\\bytecodeemitter.cpp @ 4808])", "Id": 8171416, "Keywords": "", "Tags": "", "AssignedTo": "Paul Leathers", "Triage": "Investigate", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\Chakra Javascript Engine", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "facebook.com:In touch devices instead of emotion icons ,right click context menu opens on long press ", "Id": 8330646, "Keywords": "", "Tags": "FH_14393; Mindtree", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\1607" }], "SwitchRiskBugs": [{ "Domain": "facebook.com", "Title": "apps.facebook.com : Page goes \"not responding\" as you start playing game. Unable to play game. keeps on hanging.", "Id": 8248297, "Keywords": "interop0", "Tags": "FH_14393; Mindtree; publicregression; RSEdgeScrub2; RSEdgeScrub2_Repro", "AssignedTo": "Ujesh Nambiar", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 1, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Edge: facebook.com: Text input box is broken from right end.", "Id": 3676153, "Keywords": "Interop0 BrTriage_150725 BrTriage_150725 reducedby_ujeshn ReducedDate_20150828", "Tags": "Mindtree; nonhii; RSEdgeScrub1; RSEdgeScrub1_Repro; RSEdgeScrub2; RSEdgeScrub2_Repro", "AssignedTo": "Balaji Bhaskar", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "facebook.com : Left panel is flickering on scrolling", "Id": 6361337, "Keywords": "Interop0 BrTriage_160201 NeedsReduction", "Tags": "Edgeflighting_TP19; Mindtree; nonhii; RSEdgeScrub1; RSEdgeScrub1_Repro", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 3, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\REN-Rendering\\Jittery Fixed Elements", "Product": "Redstone", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "facebook.com: Photo Album pop-up window doesn't come up and photo uploading process keeps on running when trying to upload multiple photos.", "Id": 8165624, "Keywords": "Interop0", "Tags": "Mindtree", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Pinch zoom out not firing resize event", "Id": 107013, "Keywords": "ReducedDate_20140426 REDUCEDBY_mattkot; COMP_FUNC;  Interop1; Edge_TP1_Reviewed; zTop100 zNotorious250", "Tags": "nonhii; RSEdgeScrub1", "AssignedTo": "Matt Rakow", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 1, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\COMP-Composition\\Scrolling Effects", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "apps.facebook.com: Scrolling is not smooth.", "Id": 4751931, "Keywords": "Interop1 BrTriage_150928 needsreduction ", "Tags": "Edgeflighting_TP13; Edgeflighting_TP19; Mindtree; RSEdgeScrub1; RSEdgeScrub1_Repro; RSEdgeScrub2; RSEdgeScrub2_Repro; TOPFB", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\COMP-Composition", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "facebook.com typing is slow when the CPU is pegged", "Id": 4755478, "Keywords": "Interop1 needsreduction zTop100 zNotorious250", "Tags": "nonhii; RSEdgeScrub1; RSEdgeScrub1_Skipped", "AssignedTo": "Amit Jain (IOT)", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 1, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Edge:facebook.com:Image overlapping in page print preview ", "Id": 6989313, "Keywords": "Interop1 reducedby_ujeshn ReducedDate_20160324 BrTriage_160324", "Tags": "Edgeflighting_TP19; Mindtree", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": null, "Severity": 3, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Phone: Facebook.com : User unable to enter text in the textboxes as the keypad pop ups momentarily", "Id": 7307300, "Keywords": "needsreduction; Rs1_Input_Related interop1", "Tags": "Mindtree; Phone_Edgeflighting_14295; Phone_EdgeFlighting_TP6; Phone_FH_14322; Phone_FH_14328; Phone_FH_14356", "AssignedTo": "Amit Jain (IOT)", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "On facebook.com, while window is of type ContentScriptGlobalScope, top is of type Window", "Id": 8034591, "Keywords": "", "Tags": "EXT_LastPass", "AssignedTo": "Scott Sheehan", "Triage": "Approved by Feature Team", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 0, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Redstone", "Iteration": "OS\\1609" }, { "Domain": "facebook.com", "Title": "Taking Web Note on scrolled Facebook news feed creates weird screenshot issues", "Id": 6249690, "Keywords": "", "Tags": "RSEdgeScrub1; RSEdgeScrub1_Repro", "AssignedTo": "Christian Fortini", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 1, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\REN-Rendering", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Narrator : Facebook : Narrator sets focus beside search box and reads as \"Editable text\".", "Id": 7895622, "Keywords": "IndiaAppCompat", "Tags": "AccSelfLime; AccWiPro", "AssignedTo": "Bogdan Brinza", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 1, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Edge doesn't support \"Facebook forgot password option\" with selection \"Use your google account to reset the password\". It stuck at email verified window. I had to use chrome to workaround it.", "Id": 7945817, "Keywords": "needsreduction ImpactsFacebook hii", "Tags": "CE_UIF; Checkbox Promoted; hii; Promoted User Feedback", "AssignedTo": "Kris Krueger", "Triage": "Approved by Feature Team", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 1, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\DOM-Document Object Model", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "[Edge F12] DOM - dom tree style attribute doesn't get updated when inline style is changed from style panel", "Id": 5736611, "Keywords": "", "Tags": "dom", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Remove sRGB Color profile detection code in Edge", "Id": 6853978, "Keywords": "BrTriage_160316", "Tags": "Checkbox Promoted; Promoted User Feedback; Screenshot Attached", "AssignedTo": "Rafael Cintron", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 3, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability\\Imaging", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Depleted commit and graphics issues leading to black screen when IE puts the system under pressure in Windows 10", "Id": 7980207, "Keywords": "W10AdoptionBlocker; gethelp", "Tags": "", "AssignedTo": "Rico Mariani", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Buggy text input in Facebook text message input box on phone (desktop version of web site).", "Id": 7184601, "Keywords": "", "Tags": "", "AssignedTo": "Amit Jain (IOT)", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Phone: facebook.com - Edge browser crashes while trying to move the page in News Feed ( FAILURE_BUCKET_ID:  OOM_c00001ad_microsoftedgecp.exe!out_of_memory)", "Id": 7262326, "Keywords": "crash", "Tags": "th2_release_sec.10586.13094.20160305-1200; wipro", "AssignedTo": "Riff Jiang", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\PPR-Performance, Power, and Reliability\\Memory", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Facebook.com - Chat window - Spell check line stays on after hitting enter to send message", "Id": 7283817, "Keywords": "", "Tags": "TIETRI_Approved", "AssignedTo": "Grisha Lyukshin", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing\\Spell Checking and Autocorrection", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "OOM_AVRF_c0000602_microsoftedgecp.exe!out_of_memory", "Id": 7296277, "Keywords": "", "Tags": "", "AssignedTo": "Kevin Babbitt", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Phone: Facebook.com: The beginning of the text doesn't start with a capital letter on Create Event", "Id": 7443191, "Keywords": "", "Tags": "bstfuture; Mindtree; MRolling100; Rolling100_Phone_TP8; TH2Fix_TP1", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "text selection on facebook search box is not working as expected", "Id": 7884712, "Keywords": "Selection_RevampWorkRelated ImpactsFacebook ", "Tags": "TIETRI_Approved", "AssignedTo": "Amit Jain (IOT)", "Triage": "Approved by Feature Team", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Autocorrection in Facebook chat puts the text selection in the middle of the autocorrected word in Microsoft Edge on HoloLens and Continuum", "Id": 7890978, "Keywords": "", "Tags": "bstfuture; Checkbox Promoted; Promoted User Feedback", "AssignedTo": "Christian Fortini", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 1, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "[Microsoft Edge PC]:-[\"Add photos \" option is displayed twice , after deleting the uploaded image in facebook]", "Id": 7918916, "Keywords": "PCTP Experiences;Spartan needsreduction", "Tags": "ac: validation manual - india; COMPAT_TRIAGED; hii; PCTP Experiences", "AssignedTo": "Patrick Kettner", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Future", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "Narrator: Facebook.com: Narrator highlights but does not read the names for the textboxes - Last name, Mobile number or email, Re-enter mobile number of email, New password, in Item view", "Id": 8038416, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator: Facebook.com: Narrator highlights but does not read the names for the textboxes - \"First Name\", \"Last Name\", \"Mobile number or email\" and \"Re-enter mobile number or email\" in \"Read from here\" view", "Id": 8038643, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator: Facebook.com: Narrator highlights but does not read the names for Birthday Month, Day and Year dropdowns, in \"Read from here\" view", "Id": 8038734, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator: facebook.com: Clicking enter opens the dropdown menu but does not read the menu items for Settings and Friends dropdown, while narrator is in Item view", "Id": 8039543, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator: facebook.com:Narrator reads but does not highlight the Friend Requests, Messages and Notification icon in the page header, in \"Read from Here\" view", "Id": 8062534, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator: Facebook.com: Narrator does not highlight and read the \"Privacy Shortcuts\" link in the header, in \"Read from Here\" view", "Id": 8062670, "Keywords": "", "Tags": "Mindtree; Top100_Narrator_TP3", "AssignedTo": "Bogdan Brinza", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!CAPProcessor::DeferLogEvent", "Id": 8066241, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: MicrosoftEdge.exe!SpartanXAML::MainPage::ConfigureNavSwipeBackwardPanel", "Id": 8123428, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: MicrosoftEdge.exe!SpartanXAML::MainPage::ConfigureNavSwipeBackwardPanel", "Id": 8124989, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: MicrosoftEdge.exe!SpartanXAML::MainPage::ConfigureNavSwipeBackwardPanel", "Id": 8125111, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "facebook: typing inside chat is very slow", "Id": 8155729, "Keywords": "impactsfacebook", "Tags": "TIE_FACEBOOK_CLEAN; TIERS2", "AssignedTo": "Amit Jain (IOT)", "Triage": "Approved by Feature Team", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\TIE-Text Input and Editing", "Product": "Redstone", "Iteration": "OS\\Future" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: Chakra.dll!Js::InterpreterStackFrame::OP_CallCommon_struct_Js::OpLayoutT_AsmCall_struct_Js::LayoutSizePolicy_0_____", "Id": 8214416, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\Chakra Javascript Engine", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!Tree::HTMLSerializer::SerializeTreeInternal", "Id": 8255794, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!CDestinationManager::CreateDestination_CDispRootDestination,IDispSurfaceBackedLayer,int_", "Id": 8257227, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!URLRequest::get_status", "Id": 8257411, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!CHtmScriptParseCtx::Finish", "Id": 8262009, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!Layout::ReplacedBoxNativeGeneratedImage::ApplyRenderProperties", "Id": 8282169, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: Chakra.dll!AutoFilterExceptionRegion::_AutoFilterExceptionRegion", "Id": 8307658, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\Chakra Javascript Engine", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: AV: UNKNOWN: edgehtml.dll!GWND::PostWin32MethodCallMessage", "Id": 8192116, "Keywords": "", "Tags": "", "AssignedTo": "Chakra Automation Account", "Triage": "Triage Needed", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\SIX-Security, Input and Extensibility", "Product": "Future", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "CAS:EdgeCrawler: ASSERT:  scope->HasInnerScopeIndex() (Chakra!ByteCodeGenerator::GetStSlotOp+17b [d:\\a\\_work\\15\\s\\core\\lib\\runtime\\bytecode\\bytecodeemitter.cpp @ 4808])", "Id": 8171416, "Keywords": "", "Tags": "", "AssignedTo": "Paul Leathers", "Triage": "Investigate", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": 2, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\Chakra Javascript Engine", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Narrator : Facebook.com : Narrator reads the items but there is no narrator focus around them", "Id": 7895590, "Keywords": "IndiaAppCompat", "Tags": "AccSelfLime; AccWiPro", "AssignedTo": "Bogdan Brinza", "Triage": "Investigate", "State": "Active", "Release": "", "ResolvedReason": "", "Priority": 3, "Severity": 3, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\LAY-Layout\\Accessibility", "Product": "Future", "Iteration": "OS\\Future" }], "OutreachBugs": [{ "Domain": "facebook.com", "Title": "LastPass extension: Icon overlaps with Edge password/x icons in email/password fields", "Id": 7927537, "Keywords": "", "Tags": "", "AssignedTo": "Chee Chen Tong", "Triage": "Approved by Feature Team", "State": "Active", "Release": "RS2", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\ECO-Web Developer Ecosystem\\Partner Outreach", "Product": "Edge Extensions", "Iteration": "OS\\1606" }, { "Domain": "facebook.com", "Title": "[OUTREACH]: Phone : facebook.com : Images do not fit the mobile viewport properly", "Id": 8012503, "Keywords": "", "Tags": "Adhoc_EmptyDescription; Mindtree; Phone_EdgeFlighting_TP6", "AssignedTo": "Patrick Kettner", "Triage": "Approved by Feature Team", "State": "Active", "Release": "2015", "ResolvedReason": "", "Priority": null, "Severity": 2, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\ECO-Web Developer Ecosystem\\Partner Outreach", "Product": "Web", "Iteration": "OS\\1607" }], "CurrentReleaseBugs": [{ "Domain": "facebook.com", "Title": "Cant close that window...", "Id": 7679936, "Keywords": "", "Tags": "", "AssignedTo": "Ibrahim Orakli", "Triage": "Triage Needed", "State": "Active", "Release": "RS1", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\COMP-Composition", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Edge Seems to Freeze Up Frequently in Build 14361 on Many Common Big Sites (ex: Facebook Live Videos)", "Id": 7880491, "Keywords": "", "Tags": "", "AssignedTo": "Brad Edwards", "Triage": "Triage Needed", "State": "Active", "Release": "RS1", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\INTEROP-Broken Sites", "Product": "Redstone", "Iteration": "OS\\1607" }, { "Domain": "facebook.com", "Title": "Facebook chat region false render upon scrolling down", "Id": 7728219, "Keywords": "", "Tags": "", "AssignedTo": "Ibrahim Orakli", "Triage": "Triage Needed", "State": "Active", "Release": "RS1", "ResolvedReason": "", "Priority": null, "Severity": null, "AreaPath": "OS\\CORE-OS Core\\WPT-Web Platform\\COMP-Composition", "Product": "Redstone", "Iteration": "OS\\1607" }
            ]
        };
    }

    export function getMockBuiltWithData(): any {
        return {
            "identifier": "facebook.com",
            "metadata": {
                "topLevelDomain": "facebook.com",
                "social": null,
                "companyName": "Facebook",
                "telephones": null,
                "emails": [],
                "city": null,
                "state": null,
                "postcode": null,
                "country": "",
                "names": [
                    {
                        "name": "Kent Beck",
                        "type": 8
                    },
                    {
                        "name": "Eduardo Saverin",
                        "type": 8
                    },
                    {
                        "name": "Kun Chen",
                        "type": 8
                    },
                    {
                        "name": "Charlie Deets",
                        "type": 8
                    },
                    {
                        "name": "Rohit Wad",
                        "type": 5
                    },
                    {
                        "name": "Bill Weihl",
                        "type": 5
                    },
                    {
                        "name": "Don Seymour",
                        "type": 3
                    },
                    {
                        "name": "baatar nyamkhuu",
                        "type": 3
                    }
                ],
                "aRank": 2,
                "qRank": -1
            },
            "technologies": [
                {
                    "categories": [
                        "Standard"
                    ],
                    "name": "SPF",
                    "tag": "mx",
                    "firstDetected": 1427238000000,
                    "lastDetected": 1467327600000
                },
                {
                    "categories": null,
                    "name": "Facebook Like",
                    "tag": "widgets",
                    "firstDetected": 1427238000000,
                    "lastDetected": 1428008942799
                },
                {
                    "categories": null,
                    "name": "Akamai",
                    "tag": "cdn",
                    "firstDetected": 1427238000000,
                    "lastDetected": 1467327600000
                },
                {
                    "categories": null,
                    "name": "DigiCert SSL",
                    "tag": "ssl",
                    "firstDetected": 1427238000000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": [
                        "Programming Language"
                    ],
                    "name": "PHP",
                    "tag": "framework",
                    "firstDetected": 1427238000000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "Facebook CDN",
                    "tag": "cdn",
                    "firstDetected": 1427238000000,
                    "lastDetected": 1467327600000
                },
                {
                    "categories": null,
                    "name": "Content Delivery Network",
                    "tag": "CDN",
                    "firstDetected": 1427238000000,
                    "lastDetected": 1456617600000
                },
                {
                    "categories": [
                        "Standard"
                    ],
                    "name": "DMARC",
                    "tag": "mx",
                    "firstDetected": 1427760000000,
                    "lastDetected": 1467327600000
                },
                {
                    "categories": null,
                    "name": "IPv6",
                    "tag": "Server",
                    "firstDetected": 1427760000000,
                    "lastDetected": 1467327600000
                },
                {
                    "categories": null,
                    "name": "BOA",
                    "tag": "Web Server",
                    "firstDetected": 1427756400000,
                    "lastDetected": 1427756400000
                },
                {
                    "categories": null,
                    "name": "J2EE",
                    "tag": "framework",
                    "firstDetected": 1427238000000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "SSL by Default",
                    "tag": "ssl",
                    "firstDetected": 1427929200000,
                    "lastDetected": 1466722800000
                },
                {
                    "categories": null,
                    "name": "Min Width",
                    "tag": "css",
                    "firstDetected": 1430265600000,
                    "lastDetected": 1456444800000
                },
                {
                    "categories": null,
                    "name": "Max Width",
                    "tag": "css",
                    "firstDetected": 1430265600000,
                    "lastDetected": 1431388800000
                },
                {
                    "categories": null,
                    "name": "Yahoo User Interface",
                    "tag": "javascript",
                    "firstDetected": 1429743600000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "Apache Traffic Server",
                    "tag": "Web Server",
                    "firstDetected": 1429743600000,
                    "lastDetected": 1429743600000
                },
                {
                    "categories": [
                        "Feedback Forms and Surveys"
                    ],
                    "name": "MailChimp",
                    "tag": "widgets",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1447196400000
                },
                {
                    "categories": null,
                    "name": "TownNews.com",
                    "tag": "widgets",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": null,
                    "name": "SoundCloud",
                    "tag": "media",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": null,
                    "name": "Media News Group Interactive",
                    "tag": "ads",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": null,
                    "name": "Ning",
                    "tag": "widgets",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1447196400000
                },
                {
                    "categories": null,
                    "name": "Constant Contact",
                    "tag": "widgets",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": [
                        "Ad Analytics",
                        "Ad Server",
                        "Digital Video Ads",
                        "Search"
                    ],
                    "name": "Atlas",
                    "tag": "ads",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": [
                        "Enterprise",
                        "Online Video Platform",
                        "Video Analytics",
                        "Video Players"
                    ],
                    "name": "Wistia",
                    "tag": "media",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1447196400000
                },
                {
                    "categories": null,
                    "name": "World Now",
                    "tag": "ads",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": [
                        "Live Stream / Webcast",
                        "Online Video Platform"
                    ],
                    "name": "Livestream",
                    "tag": "media",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": [
                        "Marketing Automation"
                    ],
                    "name": "aWeber",
                    "tag": "analytics",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1462489200000
                },
                {
                    "categories": [
                        "Simple Website Builder"
                    ],
                    "name": "Homestead",
                    "tag": "cms",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1434841200000
                },
                {
                    "categories": [
                        "Hosted Solution"
                    ],
                    "name": "ShopTab",
                    "tag": "shop",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1458514800000
                },
                {
                    "categories": null,
                    "name": "GetResponse",
                    "tag": "widgets",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1434841200000
                },
                {
                    "categories": null,
                    "name": "Qualtrics Site Intercept",
                    "tag": "widgets",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1434841200000
                },
                {
                    "categories": null,
                    "name": "Imgur",
                    "tag": "widgets",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": [
                        "Real Estate"
                    ],
                    "name": "flexmls",
                    "tag": "cms",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": [
                        "Online Video Platform"
                    ],
                    "name": "Vid.ly",
                    "tag": "media",
                    "firstDetected": 1434841200000,
                    "lastDetected": 1434841200000
                },
                {
                    "categories": null,
                    "name": "Commission Junction",
                    "tag": "ads",
                    "firstDetected": 1447196400000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": null,
                    "name": "Serendipity",
                    "tag": "cms",
                    "firstDetected": 1447196400000,
                    "lastDetected": 1447196400000
                },
                {
                    "categories": null,
                    "name": "K2F",
                    "tag": "framework",
                    "firstDetected": 1447196400000,
                    "lastDetected": 1447196400000
                },
                {
                    "categories": [
                        "Feedback Forms and Surveys"
                    ],
                    "name": "Wufoo",
                    "tag": "widgets",
                    "firstDetected": 1447196400000,
                    "lastDetected": 1447196400000
                },
                {
                    "categories": null,
                    "name": "Nanigans",
                    "tag": "ads",
                    "firstDetected": 1447196400000,
                    "lastDetected": 1447196400000
                },
                {
                    "categories": null,
                    "name": "Magic Software",
                    "tag": "widgets",
                    "firstDetected": 1447196400000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": [
                        "Image Provider"
                    ],
                    "name": "Shutterstock",
                    "tag": "widgets",
                    "firstDetected": 1447196400000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": null,
                    "name": "Getty Images",
                    "tag": "widgets",
                    "firstDetected": 1447196400000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": null,
                    "name": "MaxCDN",
                    "tag": "cdn",
                    "firstDetected": 1448319600000,
                    "lastDetected": 1448319600000
                },
                {
                    "categories": null,
                    "name": "Turner CDN",
                    "tag": "cdn",
                    "firstDetected": 1448319600000,
                    "lastDetected": 1448319600000
                },
                {
                    "categories": [
                        "Payment Currency"
                    ],
                    "name": "Euro",
                    "tag": "payment",
                    "firstDetected": 1447196400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "Google Front End",
                    "tag": "framework",
                    "firstDetected": 1447196400000,
                    "lastDetected": 1447196400000
                },
                {
                    "categories": null,
                    "name": "Adobe ColdFusion",
                    "tag": "framework",
                    "firstDetected": 1453766400000,
                    "lastDetected": 1453852800000
                },
                {
                    "categories": null,
                    "name": "YUI3",
                    "tag": "javascript",
                    "firstDetected": 1453852800000,
                    "lastDetected": 1453852800000
                },
                {
                    "categories": null,
                    "name": "DHL",
                    "tag": "shipping",
                    "firstDetected": 1455145200000,
                    "lastDetected": 1466722800000
                },
                {
                    "categories": null,
                    "name": "Facebook for Websites",
                    "tag": "javascript",
                    "firstDetected": 1454972400000,
                    "lastDetected": 1462834800000
                },
                {
                    "categories": null,
                    "name": "Facebook Graph API",
                    "tag": "javascript",
                    "firstDetected": 1454972400000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": null,
                    "name": "Spanish HREF LANG",
                    "tag": "language",
                    "firstDetected": 1456354800000,
                    "lastDetected": 1467327600000
                },
                {
                    "categories": null,
                    "name": "Hindi HREF LANG",
                    "tag": "language",
                    "firstDetected": 1456354800000,
                    "lastDetected": 1467327600000
                },
                {
                    "categories": null,
                    "name": "Thai HREF LANG",
                    "tag": "language",
                    "firstDetected": 1456354800000,
                    "lastDetected": 1467327600000
                },
                {
                    "categories": null,
                    "name": "English HREF LANG",
                    "tag": "language",
                    "firstDetected": 1456354800000,
                    "lastDetected": 1467327600000
                },
                {
                    "categories": null,
                    "name": "Device Pixel Ratio",
                    "tag": "css",
                    "firstDetected": 1456444800000,
                    "lastDetected": 1467327600000
                },
                {
                    "categories": null,
                    "name": "Resolution",
                    "tag": "css",
                    "firstDetected": 1456444800000,
                    "lastDetected": 1467327600000
                },
                {
                    "categories": null,
                    "name": "UPS",
                    "tag": "shipping",
                    "firstDetected": 1459378800000,
                    "lastDetected": 1466722800000
                },
                {
                    "categories": null,
                    "name": "TNT",
                    "tag": "shipping",
                    "firstDetected": 1461193200000,
                    "lastDetected": 1462402800000
                },
                {
                    "categories": null,
                    "name": "Weborama",
                    "tag": "ads",
                    "firstDetected": 1462489200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": [
                        "Affiliate Programs"
                    ],
                    "name": "Zanox",
                    "tag": "ads",
                    "firstDetected": 1462489200000,
                    "lastDetected": 1462489200000
                },
                {
                    "categories": null,
                    "name": "Wunderground",
                    "tag": "widgets",
                    "firstDetected": 1462489200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": null,
                    "name": "PayPal Button",
                    "tag": "payment",
                    "firstDetected": 1462489200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": [
                        "Mapping SaaS"
                    ],
                    "name": "ArcGIS",
                    "tag": "mapping",
                    "firstDetected": 1462489200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": [
                        "Application Performance"
                    ],
                    "name": "Dynatrace",
                    "tag": "analytics",
                    "firstDetected": 1462489200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": null,
                    "name": "Royal Mail",
                    "tag": "shipping",
                    "firstDetected": 1463007600000,
                    "lastDetected": 1463612400000
                },
                {
                    "categories": null,
                    "name": "Vimeo CDN",
                    "tag": "cdn",
                    "firstDetected": 1462834800000,
                    "lastDetected": 1462834800000
                },
                {
                    "categories": [
                        "JavaScript Library"
                    ],
                    "name": "jQuery",
                    "tag": "javascript",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "Campaign Monitor Widget",
                    "tag": "widgets",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "German HREF LANG",
                    "tag": "language",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "Perl",
                    "tag": "framework",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "DoubleClick.Net",
                    "tag": "ads",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467327600000
                },
                {
                    "categories": [
                        "Image Provider"
                    ],
                    "name": "Fotolia",
                    "tag": "widgets",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": null,
                    "name": "Ticketfly",
                    "tag": "widgets",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "Google Calendar",
                    "tag": "widgets",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "Mixcloud",
                    "tag": "media",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": [
                        "Audience Measurement"
                    ],
                    "name": "MediaMind",
                    "tag": "analytics",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": [
                        "Bookings"
                    ],
                    "name": "TicketLeap",
                    "tag": "widgets",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "Mobile Non Scaleable Content",
                    "tag": "mobile",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": [
                        "Bookings"
                    ],
                    "name": "TicketWeb",
                    "tag": "widgets",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": null,
                    "name": "Gravatar Profiles",
                    "tag": "widgets",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": [
                        "Live Stream / Webcast",
                        "Online Video Platform",
                        "Social Video Platform"
                    ],
                    "name": "YouTube",
                    "tag": "media",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "Japanese Yen",
                    "tag": "payment",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "Arts People",
                    "tag": "widgets",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "Big Cartel",
                    "tag": "shop",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "Viewport Meta",
                    "tag": "mobile",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "Chinese HREF LANG",
                    "tag": "language",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "Pound Sterling",
                    "tag": "payment",
                    "firstDetected": 1467068400000,
                    "lastDetected": 1467068400000
                },
                {
                    "categories": null,
                    "name": "FedEx",
                    "tag": "shipping",
                    "firstDetected": 1466722800000,
                    "lastDetected": 1466722800000
                },
                {
                    "categories": null,
                    "name": "Financial Content",
                    "tag": "analytics",
                    "firstDetected": 1467241200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": null,
                    "name": "Vevo",
                    "tag": "media",
                    "firstDetected": 1467241200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": [
                        "Ad Exchange",
                        "Demand-side Platform"
                    ],
                    "name": "AppNexus",
                    "tag": "ads",
                    "firstDetected": 1467241200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": [
                        "Hosted Solution"
                    ],
                    "name": "AbleCommerce",
                    "tag": "shop",
                    "firstDetected": 1467241200000,
                    "lastDetected": 1467241200000
                },
                {
                    "categories": null,
                    "name": "smartURL",
                    "tag": "widgets",
                    "firstDetected": 1467241200000,
                    "lastDetected": 1467241200000
                }
            ]
        };
    }

    export function getMockBugTrendsBlobUrl(): any {
        return "https://iesitereporter.blob.core.windows.net/bugtrends/domainbugtrends/facebook.com/rs1?sv=2015-12-11&sr=c&si=readonlypolicy&sig=r3jrO1mkOZJREfSr2EqYv8TGHDFDqwtirEfupktufPU%3D";
    }

    export function getMockBugTrends(): any {
        return {
            "AllBugs": [{ "Date": "2016-05-16T00:00:00", "Count": 29 }, { "Date": "2016-05-17T00:00:00", "Count": 32 }, { "Date": "2016-05-18T00:00:00", "Count": 32 }, { "Date": "2016-05-19T00:00:00", "Count": 32 }, { "Date": "2016-05-20T00:00:00", "Count": 30 }, { "Date": "2016-05-21T00:00:00", "Count": 30 }, { "Date": "2016-05-22T00:00:00", "Count": 30 }, { "Date": "2016-05-23T00:00:00", "Count": 28 }, { "Date": "2016-05-24T00:00:00", "Count": 29 }, { "Date": "2016-05-25T00:00:00", "Count": 29 }, { "Date": "2016-05-26T00:00:00", "Count": 27 }, { "Date": "2016-05-27T00:00:00", "Count": 28 }, { "Date": "2016-05-28T00:00:00", "Count": 28 }, { "Date": "2016-05-29T00:00:00", "Count": 28 }, { "Date": "2016-05-30T00:00:00", "Count": 28 }, { "Date": "2016-05-31T00:00:00", "Count": 27 }, { "Date": "2016-06-01T00:00:00", "Count": 36 }, { "Date": "2016-06-02T00:00:00", "Count": 36 }, { "Date": "2016-06-03T00:00:00", "Count": 36 }, { "Date": "2016-06-04T00:00:00", "Count": 36 }, { "Date": "2016-06-05T00:00:00", "Count": 36 }, { "Date": "2016-06-06T00:00:00", "Count": 37 }, { "Date": "2016-06-07T00:00:00", "Count": 35 }, { "Date": "2016-06-08T00:00:00", "Count": 36 }, { "Date": "2016-06-09T00:00:00", "Count": 38 }, { "Date": "2016-06-10T00:00:00", "Count": 36 }, { "Date": "2016-06-11T00:00:00", "Count": 36 }, { "Date": "2016-06-12T00:00:00", "Count": 35 }, { "Date": "2016-06-13T00:00:00", "Count": 35 }, { "Date": "2016-06-14T00:00:00", "Count": 37 }, { "Date": "2016-06-15T00:00:00", "Count": 41 }, { "Date": "2016-06-16T00:00:00", "Count": 41 }, { "Date": "2016-06-17T00:00:00", "Count": 44 }, { "Date": "2016-06-18T00:00:00", "Count": 45 }, { "Date": "2016-06-19T00:00:00", "Count": 45 }, { "Date": "2016-06-20T00:00:00", "Count": 46 }, { "Date": "2016-06-21T00:00:00", "Count": 49 }, { "Date": "2016-06-22T00:00:00", "Count": 51 }, { "Date": "2016-06-23T00:00:00", "Count": 52 }, { "Date": "2016-06-24T00:00:00", "Count": 49 }, { "Date": "2016-06-25T00:00:00", "Count": 49 }, { "Date": "2016-06-26T00:00:00", "Count": 48 }, { "Date": "2016-06-27T00:00:00", "Count": 50 }, { "Date": "2016-06-28T00:00:00", "Count": 52 }, { "Date": "2016-06-29T00:00:00", "Count": 51 }, { "Date": "2016-06-30T00:00:00", "Count": 55 }, { "Date": "2016-07-01T00:00:00", "Count": 54 }, { "Date": "2016-07-02T00:00:00", "Count": 54 }, { "Date": "2016-07-03T00:00:00", "Count": 54 }, { "Date": "2016-07-04T00:00:00", "Count": 53 }, { "Date": "2016-07-05T00:00:00", "Count": 51 }, { "Date": "2016-07-06T00:00:00", "Count": 54 }, { "Date": "2016-07-07T00:00:00", "Count": 60 }, { "Date": "2016-07-08T00:00:00", "Count": 60 }, { "Date": "2016-07-09T00:00:00", "Count": 63 }, { "Date": "2016-07-10T00:00:00", "Count": 63 }, { "Date": "2016-07-11T00:00:00", "Count": 63 }, { "Date": "2016-07-12T00:00:00", "Count": 57 }, { "Date": "2016-07-13T00:00:00", "Count": 59 }, { "Date": "2016-07-14T00:00:00", "Count": 60 }, { "Date": "2016-07-15T00:00:00", "Count": 63 }, { "Date": "2016-07-16T00:00:00", "Count": 64 }, { "Date": "2016-07-17T00:00:00", "Count": 64 }, { "Date": "2016-07-18T00:00:00", "Count": 65 }, { "Date": "2016-07-19T00:00:00", "Count": 65 }, { "Date": "2016-07-20T00:00:00", "Count": 65 }, { "Date": "2016-07-21T00:00:00", "Count": 67 }, { "Date": "2016-07-22T00:00:00", "Count": 68 }, { "Date": "2016-07-23T00:00:00", "Count": 72 }, { "Date": "2016-07-24T00:00:00", "Count": 73 }, { "Date": "2016-07-25T00:00:00", "Count": 72 }, { "Date": "2016-07-26T00:00:00", "Count": 74 }, { "Date": "2016-07-27T00:00:00", "Count": 73 }, { "Date": "2016-07-28T00:00:00", "Count": 74 }, { "Date": "2016-07-29T00:00:00", "Count": 74 }, { "Date": "2016-07-30T00:00:00", "Count": 74 }, { "Date": "2016-07-31T00:00:00", "Count": 74 }, { "Date": "2016-08-01T00:00:00", "Count": 73 }, { "Date": "2016-08-02T00:00:00", "Count": 70 }, { "Date": "2016-08-03T00:00:00", "Count": 71 }, { "Date": "2016-08-04T00:00:00", "Count": 71 }, { "Date": "2016-08-05T00:00:00", "Count": 70 }, { "Date": "2016-08-06T00:00:00", "Count": 71 }],
            "SwitchRiskBugs": [{ "Date": "2016-05-16T00:00:00", "Count": 21 }, { "Date": "2016-05-17T00:00:00", "Count": 22 }, { "Date": "2016-05-18T00:00:00", "Count": 23 }, { "Date": "2016-05-19T00:00:00", "Count": 23 }, { "Date": "2016-05-20T00:00:00", "Count": 21 }, { "Date": "2016-05-21T00:00:00", "Count": 21 }, { "Date": "2016-05-22T00:00:00", "Count": 21 }, { "Date": "2016-05-23T00:00:00", "Count": 19 }, { "Date": "2016-05-24T00:00:00", "Count": 20 }, { "Date": "2016-05-25T00:00:00", "Count": 20 }, { "Date": "2016-05-26T00:00:00", "Count": 19 }, { "Date": "2016-05-27T00:00:00", "Count": 20 }, { "Date": "2016-05-28T00:00:00", "Count": 20 }, { "Date": "2016-05-29T00:00:00", "Count": 20 }, { "Date": "2016-05-30T00:00:00", "Count": 20 }, { "Date": "2016-05-31T00:00:00", "Count": 19 }, { "Date": "2016-06-01T00:00:00", "Count": 21 }, { "Date": "2016-06-02T00:00:00", "Count": 21 }, { "Date": "2016-06-03T00:00:00", "Count": 21 }, { "Date": "2016-06-04T00:00:00", "Count": 21 }, { "Date": "2016-06-05T00:00:00", "Count": 21 }, { "Date": "2016-06-06T00:00:00", "Count": 22 }, { "Date": "2016-06-07T00:00:00", "Count": 21 }, { "Date": "2016-06-08T00:00:00", "Count": 21 }, { "Date": "2016-06-09T00:00:00", "Count": 22 }, { "Date": "2016-06-10T00:00:00", "Count": 22 }, { "Date": "2016-06-11T00:00:00", "Count": 22 }, { "Date": "2016-06-12T00:00:00", "Count": 21 }, { "Date": "2016-06-13T00:00:00", "Count": 21 }, { "Date": "2016-06-14T00:00:00", "Count": 21 }, { "Date": "2016-06-15T00:00:00", "Count": 23 }, { "Date": "2016-06-16T00:00:00", "Count": 22 }, { "Date": "2016-06-17T00:00:00", "Count": 26 }, { "Date": "2016-06-18T00:00:00", "Count": 26 }, { "Date": "2016-06-19T00:00:00", "Count": 26 }, { "Date": "2016-06-20T00:00:00", "Count": 28 }, { "Date": "2016-06-21T00:00:00", "Count": 28 }, { "Date": "2016-06-22T00:00:00", "Count": 29 }, { "Date": "2016-06-23T00:00:00", "Count": 30 }, { "Date": "2016-06-24T00:00:00", "Count": 29 }, { "Date": "2016-06-25T00:00:00", "Count": 29 }, { "Date": "2016-06-26T00:00:00", "Count": 28 }, { "Date": "2016-06-27T00:00:00", "Count": 28 }, { "Date": "2016-06-28T00:00:00", "Count": 31 }, { "Date": "2016-06-29T00:00:00", "Count": 29 }, { "Date": "2016-06-30T00:00:00", "Count": 31 }, { "Date": "2016-07-01T00:00:00", "Count": 30 }, { "Date": "2016-07-02T00:00:00", "Count": 30 }, { "Date": "2016-07-03T00:00:00", "Count": 30 }, { "Date": "2016-07-04T00:00:00", "Count": 30 }, { "Date": "2016-07-05T00:00:00", "Count": 30 }, { "Date": "2016-07-06T00:00:00", "Count": 33 }, { "Date": "2016-07-07T00:00:00", "Count": 39 }, { "Date": "2016-07-08T00:00:00", "Count": 39 }, { "Date": "2016-07-09T00:00:00", "Count": 42 }, { "Date": "2016-07-10T00:00:00", "Count": 42 }, { "Date": "2016-07-11T00:00:00", "Count": 42 }, { "Date": "2016-07-12T00:00:00", "Count": 34 }, { "Date": "2016-07-13T00:00:00", "Count": 36 }, { "Date": "2016-07-14T00:00:00", "Count": 37 }, { "Date": "2016-07-15T00:00:00", "Count": 40 }, { "Date": "2016-07-16T00:00:00", "Count": 40 }, { "Date": "2016-07-17T00:00:00", "Count": 40 }, { "Date": "2016-07-18T00:00:00", "Count": 40 }, { "Date": "2016-07-19T00:00:00", "Count": 40 }, { "Date": "2016-07-20T00:00:00", "Count": 40 }, { "Date": "2016-07-21T00:00:00", "Count": 39 }, { "Date": "2016-07-22T00:00:00", "Count": 40 }, { "Date": "2016-07-23T00:00:00", "Count": 44 }, { "Date": "2016-07-24T00:00:00", "Count": 45 }, { "Date": "2016-07-25T00:00:00", "Count": 44 }, { "Date": "2016-07-26T00:00:00", "Count": 45 }, { "Date": "2016-07-27T00:00:00", "Count": 45 }, { "Date": "2016-07-28T00:00:00", "Count": 46 }, { "Date": "2016-07-29T00:00:00", "Count": 45 }, { "Date": "2016-07-30T00:00:00", "Count": 45 }, { "Date": "2016-07-31T00:00:00", "Count": 45 }, { "Date": "2016-08-01T00:00:00", "Count": 45 }, { "Date": "2016-08-02T00:00:00", "Count": 42 }, { "Date": "2016-08-03T00:00:00", "Count": 42 }, { "Date": "2016-08-04T00:00:00", "Count": 43 }, { "Date": "2016-08-05T00:00:00", "Count": 44 }, { "Date": "2016-08-06T00:00:00", "Count": 44 }],
            "OutreachBugs": [{ "Date": "2016-05-16T00:00:00", "Count": 4 }, { "Date": "2016-05-17T00:00:00", "Count": 4 }, { "Date": "2016-05-18T00:00:00", "Count": 4 }, { "Date": "2016-05-19T00:00:00", "Count": 4 }, { "Date": "2016-05-20T00:00:00", "Count": 4 }, { "Date": "2016-05-21T00:00:00", "Count": 4 }, { "Date": "2016-05-22T00:00:00", "Count": 4 }, { "Date": "2016-05-23T00:00:00", "Count": 2 }, { "Date": "2016-05-24T00:00:00", "Count": 2 }, { "Date": "2016-05-25T00:00:00", "Count": 2 }, { "Date": "2016-05-26T00:00:00", "Count": 2 }, { "Date": "2016-05-27T00:00:00", "Count": 2 }, { "Date": "2016-05-28T00:00:00", "Count": 2 }, { "Date": "2016-05-29T00:00:00", "Count": 2 }, { "Date": "2016-05-30T00:00:00", "Count": 2 }, { "Date": "2016-05-31T00:00:00", "Count": 2 }, { "Date": "2016-06-01T00:00:00", "Count": 2 }, { "Date": "2016-06-02T00:00:00", "Count": 2 }, { "Date": "2016-06-03T00:00:00", "Count": 2 }, { "Date": "2016-06-04T00:00:00", "Count": 2 }, { "Date": "2016-06-05T00:00:00", "Count": 2 }, { "Date": "2016-06-06T00:00:00", "Count": 3 }, { "Date": "2016-06-07T00:00:00", "Count": 3 }, { "Date": "2016-06-08T00:00:00", "Count": 3 }, { "Date": "2016-06-09T00:00:00", "Count": 3 }, { "Date": "2016-06-10T00:00:00", "Count": 3 }, { "Date": "2016-06-11T00:00:00", "Count": 3 }, { "Date": "2016-06-12T00:00:00", "Count": 3 }, { "Date": "2016-06-13T00:00:00", "Count": 3 }, { "Date": "2016-06-14T00:00:00", "Count": 3 }, { "Date": "2016-06-15T00:00:00", "Count": 3 }, { "Date": "2016-06-16T00:00:00", "Count": 3 }, { "Date": "2016-06-17T00:00:00", "Count": 3 }, { "Date": "2016-06-18T00:00:00", "Count": 4 }, { "Date": "2016-06-19T00:00:00", "Count": 4 }, { "Date": "2016-06-20T00:00:00", "Count": 4 }, { "Date": "2016-06-21T00:00:00", "Count": 4 }, { "Date": "2016-06-22T00:00:00", "Count": 4 }, { "Date": "2016-06-23T00:00:00", "Count": 4 }, { "Date": "2016-06-24T00:00:00", "Count": 4 }, { "Date": "2016-06-25T00:00:00", "Count": 4 }, { "Date": "2016-06-26T00:00:00", "Count": 4 }, { "Date": "2016-06-27T00:00:00", "Count": 5 }, { "Date": "2016-06-28T00:00:00", "Count": 5 }, { "Date": "2016-06-29T00:00:00", "Count": 5 }, { "Date": "2016-06-30T00:00:00", "Count": 5 }, { "Date": "2016-07-01T00:00:00", "Count": 4 }, { "Date": "2016-07-02T00:00:00", "Count": 4 }, { "Date": "2016-07-03T00:00:00", "Count": 4 }, { "Date": "2016-07-04T00:00:00", "Count": 4 }, { "Date": "2016-07-05T00:00:00", "Count": 4 }, { "Date": "2016-07-06T00:00:00", "Count": 3 }, { "Date": "2016-07-07T00:00:00", "Count": 3 }, { "Date": "2016-07-08T00:00:00", "Count": 3 }, { "Date": "2016-07-09T00:00:00", "Count": 3 }, { "Date": "2016-07-10T00:00:00", "Count": 3 }, { "Date": "2016-07-11T00:00:00", "Count": 3 }, { "Date": "2016-07-12T00:00:00", "Count": 3 }, { "Date": "2016-07-13T00:00:00", "Count": 3 }, { "Date": "2016-07-14T00:00:00", "Count": 3 }, { "Date": "2016-07-15T00:00:00", "Count": 3 }, { "Date": "2016-07-16T00:00:00", "Count": 3 }, { "Date": "2016-07-17T00:00:00", "Count": 3 }, { "Date": "2016-07-18T00:00:00", "Count": 3 }, { "Date": "2016-07-19T00:00:00", "Count": 3 }, { "Date": "2016-07-20T00:00:00", "Count": 3 }, { "Date": "2016-07-21T00:00:00", "Count": 3 }, { "Date": "2016-07-22T00:00:00", "Count": 3 }, { "Date": "2016-07-23T00:00:00", "Count": 3 }, { "Date": "2016-07-24T00:00:00", "Count": 3 }, { "Date": "2016-07-25T00:00:00", "Count": 3 }, { "Date": "2016-07-26T00:00:00", "Count": 3 }, { "Date": "2016-07-27T00:00:00", "Count": 3 }, { "Date": "2016-07-28T00:00:00", "Count": 3 }, { "Date": "2016-07-29T00:00:00", "Count": 2 }, { "Date": "2016-07-30T00:00:00", "Count": 2 }, { "Date": "2016-07-31T00:00:00", "Count": 2 }, { "Date": "2016-08-01T00:00:00", "Count": 2 }, { "Date": "2016-08-02T00:00:00", "Count": 2 }, { "Date": "2016-08-03T00:00:00", "Count": 2 }, { "Date": "2016-08-04T00:00:00", "Count": 1 }, { "Date": "2016-08-05T00:00:00", "Count": 1 }, { "Date": "2016-08-06T00:00:00", "Count": 1 }],
            "CurrentReleaseBugs": [{ "Date": "2016-05-16T00:00:00", "Count": 6 }, { "Date": "2016-05-17T00:00:00", "Count": 9 }, { "Date": "2016-05-18T00:00:00", "Count": 9 }, { "Date": "2016-05-19T00:00:00", "Count": 9 }, { "Date": "2016-05-20T00:00:00", "Count": 6 }, { "Date": "2016-05-21T00:00:00", "Count": 6 }, { "Date": "2016-05-22T00:00:00", "Count": 6 }, { "Date": "2016-05-23T00:00:00", "Count": 6 }, { "Date": "2016-05-24T00:00:00", "Count": 5 }, { "Date": "2016-05-25T00:00:00", "Count": 5 }, { "Date": "2016-05-26T00:00:00", "Count": 4 }, { "Date": "2016-05-27T00:00:00", "Count": 5 }, { "Date": "2016-05-28T00:00:00", "Count": 5 }, { "Date": "2016-05-29T00:00:00", "Count": 5 }, { "Date": "2016-05-30T00:00:00", "Count": 5 }, { "Date": "2016-05-31T00:00:00", "Count": 4 }, { "Date": "2016-06-01T00:00:00", "Count": 9 }, { "Date": "2016-06-02T00:00:00", "Count": 9 }, { "Date": "2016-06-03T00:00:00", "Count": 9 }, { "Date": "2016-06-04T00:00:00", "Count": 9 }, { "Date": "2016-06-05T00:00:00", "Count": 9 }, { "Date": "2016-06-06T00:00:00", "Count": 9 }, { "Date": "2016-06-07T00:00:00", "Count": 7 }, { "Date": "2016-06-08T00:00:00", "Count": 8 }, { "Date": "2016-06-09T00:00:00", "Count": 9 }, { "Date": "2016-06-10T00:00:00", "Count": 8 }, { "Date": "2016-06-11T00:00:00", "Count": 8 }, { "Date": "2016-06-12T00:00:00", "Count": 7 }, { "Date": "2016-06-13T00:00:00", "Count": 7 }, { "Date": "2016-06-14T00:00:00", "Count": 9 }, { "Date": "2016-06-15T00:00:00", "Count": 13 }, { "Date": "2016-06-16T00:00:00", "Count": 13 }, { "Date": "2016-06-17T00:00:00", "Count": 16 }, { "Date": "2016-06-18T00:00:00", "Count": 16 }, { "Date": "2016-06-19T00:00:00", "Count": 16 }, { "Date": "2016-06-20T00:00:00", "Count": 15 }, { "Date": "2016-06-21T00:00:00", "Count": 14 }, { "Date": "2016-06-22T00:00:00", "Count": 16 }, { "Date": "2016-06-23T00:00:00", "Count": 16 }, { "Date": "2016-06-24T00:00:00", "Count": 13 }, { "Date": "2016-06-25T00:00:00", "Count": 13 }, { "Date": "2016-06-26T00:00:00", "Count": 12 }, { "Date": "2016-06-27T00:00:00", "Count": 13 }, { "Date": "2016-06-28T00:00:00", "Count": 13 }, { "Date": "2016-06-29T00:00:00", "Count": 13 }, { "Date": "2016-06-30T00:00:00", "Count": 15 }, { "Date": "2016-07-01T00:00:00", "Count": 15 }, { "Date": "2016-07-02T00:00:00", "Count": 14 }, { "Date": "2016-07-03T00:00:00", "Count": 14 }, { "Date": "2016-07-04T00:00:00", "Count": 13 }, { "Date": "2016-07-05T00:00:00", "Count": 11 }, { "Date": "2016-07-06T00:00:00", "Count": 5 }, { "Date": "2016-07-07T00:00:00", "Count": 4 }, { "Date": "2016-07-08T00:00:00", "Count": 3 }, { "Date": "2016-07-09T00:00:00", "Count": 3 }, { "Date": "2016-07-10T00:00:00", "Count": 3 }, { "Date": "2016-07-11T00:00:00", "Count": 4 }, { "Date": "2016-07-12T00:00:00", "Count": 3 }, { "Date": "2016-07-13T00:00:00", "Count": 3 }, { "Date": "2016-07-14T00:00:00", "Count": 3 }, { "Date": "2016-07-15T00:00:00", "Count": 3 }, { "Date": "2016-07-16T00:00:00", "Count": 3 }, { "Date": "2016-07-17T00:00:00", "Count": 3 }, { "Date": "2016-07-18T00:00:00", "Count": 3 }, { "Date": "2016-07-19T00:00:00", "Count": 3 }, { "Date": "2016-07-20T00:00:00", "Count": 3 }, { "Date": "2016-07-21T00:00:00", "Count": 3 }, { "Date": "2016-07-22T00:00:00", "Count": 3 }, { "Date": "2016-07-23T00:00:00", "Count": 3 }, { "Date": "2016-07-24T00:00:00", "Count": 3 }, { "Date": "2016-07-25T00:00:00", "Count": 3 }, { "Date": "2016-07-26T00:00:00", "Count": 3 }, { "Date": "2016-07-27T00:00:00", "Count": 3 }, { "Date": "2016-07-28T00:00:00", "Count": 3 }, { "Date": "2016-07-29T00:00:00", "Count": 3 }, { "Date": "2016-07-30T00:00:00", "Count": 3 }, { "Date": "2016-07-31T00:00:00", "Count": 3 }, { "Date": "2016-08-01T00:00:00", "Count": 3 }, { "Date": "2016-08-02T00:00:00", "Count": 3 }, { "Date": "2016-08-03T00:00:00", "Count": 4 }, { "Date": "2016-08-04T00:00:00", "Count": 3 }, { "Date": "2016-08-05T00:00:00", "Count": 3 }, { "Date": "2016-08-06T00:00:00", "Count": 3 }]
        };

    }

    export function getMockDetailsForDomain(): any {
        return {
            "domainName": "facebook.com",
            "isOffensive": false,
            "domainId": 2,
            "bingdexRank": 2,
            "alexaRank": 3,
            "tags": [
                { "id": 1, "text": "jquery", "type": 1 },
                { "id": 1, "text": "angular2", "type": 2 }
            ]
        };
    }

    export function getMockFiltersData(): any {
        return {
            "tag": [
                { "disabled": false, "selected": true, "text": " Bingdex Top 100", "value": "BingdexTop100" },
                { "disabled": false, "selected": false, "text": " Mind Tree Top Sites", "value": "MindTreeTopSites" },
                { "disabled": false, "selected": false, "text": " Mind Tree Notorious Sites", "value": "MindTreeNotoriousSites" },
                { "disabled": false, "selected": false, "text": " In Country Testing", "value": "InCountryTesting" }],
            "platform": [
                { "disabled": false, "selected": true, "text": "Desktop", "value": "Desktop" },
            ],
            "release": [
                { "disabled": false, "selected": false, "text": "TH1", "value": "TH1" },
                { "disabled": false, "selected": false, "text": "TH2", "value": "TH2" },
                { "disabled": false, "selected": true, "text": "RS1", "value": "RS1" }
            ]
        };
    }

    export function getMockTrendsForDomainDataRs1(): any {
        return {
            "charts": [
                {
                    "id": "frownies", "name": "Frownies", "dataPoints": [
                        { "date": "2016-04-27T00:00:00", "count": 7.0 }, { "date": "2016-04-28T00:00:00", "count": 10.0 }, { "date": "2016-04-29T00:00:00", "count": 2.0 }, { "date": "2016-04-30T00:00:00", "count": 3.0 }, { "date": "2016-05-01T00:00:00", "count": 5.0 }, { "date": "2016-05-02T00:00:00", "count": 2.0 }, { "date": "2016-05-03T00:00:00", "count": 5.0 }, { "date": "2016-05-04T00:00:00", "count": 6.0 }, { "date": "2016-05-05T00:00:00", "count": 6.0 }, { "date": "2016-05-06T00:00:00", "count": 2.0 }, { "date": "2016-05-07T00:00:00", "count": 3.0 }, { "date": "2016-05-08T00:00:00", "count": 1.0 }, { "date": "2016-05-09T00:00:00", "count": 5.0 }, { "date": "2016-05-10T00:00:00", "count": 4.0 }, { "date": "2016-05-11T00:00:00", "count": 10.0 }, { "date": "2016-05-12T00:00:00", "count": 14.0 }, { "date": "2016-05-13T00:00:00", "count": 5.0 }, { "date": "2016-05-14T00:00:00", "count": 6.0 }, { "date": "2016-05-15T00:00:00", "count": 1.0 }, { "date": "2016-05-16T00:00:00", "count": 4.0 }, { "date": "2016-05-17T00:00:00", "count": 4.0 }, { "date": "2016-05-18T00:00:00", "count": 2.0 }, { "date": "2016-05-19T00:00:00", "count": 10.0 }, { "date": "2016-05-20T00:00:00", "count": 7.0 }, { "date": "2016-05-21T00:00:00", "count": 5.0 }, { "date": "2016-05-22T00:00:00", "count": 3.0 }, { "date": "2016-05-23T00:00:00", "count": 11.0 }, { "date": "2016-05-24T00:00:00", "count": 15.0 }, { "date": "2016-05-25T00:00:00", "count": 4.0 }, { "date": "2016-05-26T00:00:00", "count": 2.0 }, { "date": "2016-05-27T00:00:00", "count": 4.0 }, { "date": "2016-05-28T00:00:00", "count": 4.0 }, { "date": "2016-05-29T00:00:00", "count": 5.0 }, { "date": "2016-05-30T00:00:00", "count": 4.0 }, { "date": "2016-05-31T00:00:00", "count": 8.0 }, { "date": "2016-06-01T00:00:00", "count": 3.0 }, { "date": "2016-06-02T00:00:00", "count": 3.0 }, { "date": "2016-06-03T00:00:00", "count": 3.0 }, { "date": "2016-06-04T00:00:00", "count": 2.0 }, { "date": "2016-06-05T00:00:00", "count": 7.0 }, { "date": "2016-06-06T00:00:00", "count": 2.0 }, { "date": "2016-06-07T00:00:00", "count": 1.0 }, { "date": "2016-06-08T00:00:00", "count": 3.0 }, { "date": "2016-06-09T00:00:00", "count": 4.0 }, { "date": "2016-06-10T00:00:00", "count": 1.0 }, { "date": "2016-06-11T00:00:00", "count": 3.0 }, { "date": "2016-06-12T00:00:00", "count": 1.0 }, { "date": "2016-06-13T00:00:00", "count": 10.0 }, { "date": "2016-06-14T00:00:00", "count": 1.0 }, { "date": "2016-06-16T00:00:00", "count": 4.0 }, { "date": "2016-06-17T00:00:00", "count": 2.0 }, { "date": "2016-06-18T00:00:00", "count": 6.0 }, { "date": "2016-06-20T00:00:00", "count": 3.0 }, { "date": "2016-06-21T00:00:00", "count": 6.0 }, { "date": "2016-06-22T00:00:00", "count": 10.0 }, { "date": "2016-06-23T00:00:00", "count": 4.0 }, { "date": "2016-06-24T00:00:00", "count": 3.0 }, { "date": "2016-06-25T00:00:00", "count": 2.0 }, { "date": "2016-06-26T00:00:00", "count": 1.0 }, { "date": "2016-06-27T00:00:00", "count": 6.0 }, { "date": "2016-06-28T00:00:00", "count": 9.0 }, { "date": "2016-06-29T00:00:00", "count": 10.0 }, { "date": "2016-06-30T00:00:00", "count": 6.0 }, { "date": "2016-07-01T00:00:00", "count": 5.0 }, { "date": "2016-07-02T00:00:00", "count": 9.0 }, { "date": "2016-07-03T00:00:00", "count": 9.0 }, { "date": "2016-07-04T00:00:00", "count": 5.0 }, { "date": "2016-07-05T00:00:00", "count": 7.0 }, { "date": "2016-07-06T00:00:00", "count": 7.0 }, { "date": "2016-07-07T00:00:00", "count": 2.0 }, { "date": "2016-07-08T00:00:00", "count": 6.0 }, { "date": "2016-07-09T00:00:00", "count": 1.0 }, { "date": "2016-07-10T00:00:00", "count": 2.0 }, { "date": "2016-07-11T00:00:00", "count": 3.0 }, { "date": "2016-07-12T00:00:00", "count": 5.0 }, { "date": "2016-07-13T00:00:00", "count": 8.0 }, { "date": "2016-07-14T00:00:00", "count": 4.0 }, { "date": "2016-07-15T00:00:00", "count": 6.0 }, { "date": "2016-07-16T00:00:00", "count": 4.0 }, { "date": "2016-07-17T00:00:00", "count": 1.0 }, { "date": "2016-07-19T00:00:00", "count": 3.0 }, { "date": "2016-07-20T00:00:00", "count": 2.0 }, { "date": "2016-07-21T00:00:00", "count": 2.0 }, { "date": "2016-07-22T00:00:00", "count": 1.0 }, { "date": "2016-07-24T00:00:00", "count": 1.0 }]
                }, {
                    "id": "crashes", "name": "Crashes", "dataPoints": []
                }, {
                    "id": "navigations", "name": "Navigations", "dataPoints": [
                        { "date": "2016-04-27T00:00:00", "count": 45922.0 }, { "date": "2016-04-28T00:00:00", "count": 45025.0 }, { "date": "2016-04-29T00:00:00", "count": 41359.0 }, { "date": "2016-04-30T00:00:00", "count": 37719.0 }, { "date": "2016-05-01T00:00:00", "count": 38853.0 }, { "date": "2016-05-02T00:00:00", "count": 41723.0 }, { "date": "2016-05-03T00:00:00", "count": 42896.0 }, { "date": "2016-05-04T00:00:00", "count": 43238.0 }, { "date": "2016-05-05T00:00:00", "count": 42470.0 }, { "date": "2016-05-06T00:00:00", "count": 41090.0 }, { "date": "2016-05-07T00:00:00", "count": 36428.0 }, { "date": "2016-05-08T00:00:00", "count": 38146.0 }, { "date": "2016-05-09T00:00:00", "count": 43091.0 }, { "date": "2016-05-10T00:00:00", "count": 42664.0 }, { "date": "2016-05-11T00:00:00", "count": 46194.0 }, { "date": "2016-05-12T00:00:00", "count": 44241.0 }, { "date": "2016-05-13T00:00:00", "count": 41447.0 }, { "date": "2016-05-14T00:00:00", "count": 37549.0 }, { "date": "2016-05-15T00:00:00", "count": 37332.0 }, { "date": "2016-05-16T00:00:00", "count": 43527.0 }, { "date": "2016-05-17T00:00:00", "count": 42132.0 }, { "date": "2016-05-18T00:00:00", "count": 43153.0 }, { "date": "2016-05-19T00:00:00", "count": 41882.0 }, { "date": "2016-05-20T00:00:00", "count": 40697.0 }, { "date": "2016-05-21T00:00:00", "count": 36262.0 }, { "date": "2016-05-22T00:00:00", "count": 36911.0 }, { "date": "2016-05-23T00:00:00", "count": 41908.0 }, { "date": "2016-05-24T00:00:00", "count": 41177.0 }, { "date": "2016-05-25T00:00:00", "count": 40939.0 }, { "date": "2016-05-26T00:00:00", "count": 38880.0 }, { "date": "2016-05-27T00:00:00", "count": 41558.0 }, { "date": "2016-05-28T00:00:00", "count": 37895.0 }, { "date": "2016-05-29T00:00:00", "count": 39678.0 }, { "date": "2016-05-30T00:00:00", "count": 42748.0 }, { "date": "2016-05-31T00:00:00", "count": 45768.0 }, { "date": "2016-06-01T00:00:00", "count": 45999.0 }, { "date": "2016-06-02T00:00:00", "count": 46203.0 }, { "date": "2016-06-03T00:00:00", "count": 44109.0 }, { "date": "2016-06-04T00:00:00", "count": 39286.0 }, { "date": "2016-06-05T00:00:00", "count": 39633.0 }, { "date": "2016-06-06T00:00:00", "count": 44539.0 }, { "date": "2016-06-07T00:00:00", "count": 45054.0 }, { "date": "2016-06-08T00:00:00", "count": 45377.0 }, { "date": "2016-06-09T00:00:00", "count": 46771.0 }, { "date": "2016-06-10T00:00:00", "count": 45326.0 }, { "date": "2016-06-11T00:00:00", "count": 40784.0 }, { "date": "2016-06-12T00:00:00", "count": 43426.0 }, { "date": "2016-06-13T00:00:00", "count": 49065.0 }, { "date": "2016-06-14T00:00:00", "count": 47716.0 }, { "date": "2016-06-15T00:00:00", "count": 49443.0 }, { "date": "2016-06-16T00:00:00", "count": 47813.0 }, { "date": "2016-06-17T00:00:00", "count": 48849.0 }, { "date": "2016-06-18T00:00:00", "count": 41286.0 }, { "date": "2016-06-19T00:00:00", "count": 44106.0 }, { "date": "2016-06-20T00:00:00", "count": 51030.0 }, { "date": "2016-06-21T00:00:00", "count": 49228.0 }, { "date": "2016-06-22T00:00:00", "count": 51016.0 }, { "date": "2016-06-23T00:00:00", "count": 47777.0 }, { "date": "2016-06-24T00:00:00", "count": 50440.0 }, { "date": "2016-06-25T00:00:00", "count": 42767.0 }, { "date": "2016-06-26T00:00:00", "count": 44887.0 }, { "date": "2016-06-27T00:00:00", "count": 51302.0 }, { "date": "2016-06-28T00:00:00", "count": 50651.0 }, { "date": "2016-06-29T00:00:00", "count": 51503.0 }, { "date": "2016-06-30T00:00:00", "count": 50792.0 }, { "date": "2016-07-01T00:00:00", "count": 50685.0 }, { "date": "2016-07-02T00:00:00", "count": 44394.0 }, { "date": "2016-07-03T00:00:00", "count": 43833.0 }, { "date": "2016-07-04T00:00:00", "count": 46286.0 }, { "date": "2016-07-05T00:00:00", "count": 49301.0 }, { "date": "2016-07-06T00:00:00", "count": 50194.0 }, { "date": "2016-07-07T00:00:00", "count": 49530.0 }, { "date": "2016-07-08T00:00:00", "count": 50197.0 }, { "date": "2016-07-09T00:00:00", "count": 44308.0 }, { "date": "2016-07-10T00:00:00", "count": 44993.0 }, { "date": "2016-07-11T00:00:00", "count": 51016.0 }, { "date": "2016-07-12T00:00:00", "count": 49994.0 }, { "date": "2016-07-13T00:00:00", "count": 50538.0 }, { "date": "2016-07-14T00:00:00", "count": 50690.0 }, { "date": "2016-07-15T00:00:00", "count": 51268.0 }, { "date": "2016-07-16T00:00:00", "count": 45621.0 }, { "date": "2016-07-17T00:00:00", "count": 44294.0 }, { "date": "2016-07-18T00:00:00", "count": 52176.0 }, { "date": "2016-07-19T00:00:00", "count": 52628.0 }, { "date": "2016-07-20T00:00:00", "count": 51552.0 }, { "date": "2016-07-21T00:00:00", "count": 51356.0 }, { "date": "2016-07-22T00:00:00", "count": 52212.0 }, { "date": "2016-07-23T00:00:00", "count": 48299.0 }, { "date": "2016-07-24T00:00:00", "count": 47240.0 }]
                }, {
                    "id": "focus-time", "name": "Focus Time (hours)", "dataPoints": [
                        { "date": "2016-04-27T00:00:00", "count": 240.0 }, { "date": "2016-04-28T00:00:00", "count": 251.0 }, { "date": "2016-04-29T00:00:00", "count": 219.0 }, { "date": "2016-04-30T00:00:00", "count": 208.0 }, { "date": "2016-05-01T00:00:00", "count": 230.0 }, { "date": "2016-05-02T00:00:00", "count": 257.0 }, { "date": "2016-05-03T00:00:00", "count": 269.0 }, { "date": "2016-05-04T00:00:00", "count": 263.0 }, { "date": "2016-05-05T00:00:00", "count": 260.0 }, { "date": "2016-05-06T00:00:00", "count": 233.0 }, { "date": "2016-05-07T00:00:00", "count": 253.0 }, { "date": "2016-05-08T00:00:00", "count": 239.0 }, { "date": "2016-05-09T00:00:00", "count": 274.0 }, { "date": "2016-05-10T00:00:00", "count": 250.0 }, { "date": "2016-05-11T00:00:00", "count": 237.0 }, { "date": "2016-05-12T00:00:00", "count": 246.0 }, { "date": "2016-05-13T00:00:00", "count": 226.0 }, { "date": "2016-05-14T00:00:00", "count": 221.0 }, { "date": "2016-05-15T00:00:00", "count": 218.0 }, { "date": "2016-05-16T00:00:00", "count": 242.0 }, { "date": "2016-05-17T00:00:00", "count": 242.0 }, { "date": "2016-05-18T00:00:00", "count": 225.0 }, { "date": "2016-05-19T00:00:00", "count": 222.0 }, { "date": "2016-05-20T00:00:00", "count": 212.0 }, { "date": "2016-05-21T00:00:00", "count": 206.0 }, { "date": "2016-05-22T00:00:00", "count": 214.0 }, { "date": "2016-05-23T00:00:00", "count": 229.0 }, { "date": "2016-05-24T00:00:00", "count": 214.0 }, { "date": "2016-05-25T00:00:00", "count": 225.0 }, { "date": "2016-05-26T00:00:00", "count": 221.0 }, { "date": "2016-05-27T00:00:00", "count": 210.0 }, { "date": "2016-05-28T00:00:00", "count": 235.0 }, { "date": "2016-05-29T00:00:00", "count": 259.0 }, { "date": "2016-05-30T00:00:00", "count": 249.0 }, { "date": "2016-05-31T00:00:00", "count": 269.0 }, { "date": "2016-06-01T00:00:00", "count": 275.0 }, { "date": "2016-06-02T00:00:00", "count": 263.0 }, { "date": "2016-06-03T00:00:00", "count": 258.0 }, { "date": "2016-06-04T00:00:00", "count": 255.0 }, { "date": "2016-06-05T00:00:00", "count": 277.0 }, { "date": "2016-06-06T00:00:00", "count": 251.0 }, { "date": "2016-06-07T00:00:00", "count": 256.0 }, { "date": "2016-06-08T00:00:00", "count": 252.0 }, { "date": "2016-06-09T00:00:00", "count": 225.0 }, { "date": "2016-06-10T00:00:00", "count": 211.0 }, { "date": "2016-06-11T00:00:00", "count": 204.0 }, { "date": "2016-06-12T00:00:00", "count": 212.0 }, { "date": "2016-06-13T00:00:00", "count": 206.0 }, { "date": "2016-06-14T00:00:00", "count": 269.0 }, { "date": "2016-06-15T00:00:00", "count": 200.0 }, { "date": "2016-06-16T00:00:00", "count": 223.0 }, { "date": "2016-06-17T00:00:00", "count": 169.0 }, { "date": "2016-06-18T00:00:00", "count": 173.0 }, { "date": "2016-06-19T00:00:00", "count": 194.0 }, { "date": "2016-06-20T00:00:00", "count": 209.0 }, { "date": "2016-06-21T00:00:00", "count": 213.0 }, { "date": "2016-06-22T00:00:00", "count": 218.0 }, { "date": "2016-06-23T00:00:00", "count": 190.0 }, { "date": "2016-06-24T00:00:00", "count": 219.0 }, { "date": "2016-06-25T00:00:00", "count": 190.0 }, { "date": "2016-06-26T00:00:00", "count": 214.0 }, { "date": "2016-06-27T00:00:00", "count": 242.0 }, { "date": "2016-06-28T00:00:00", "count": 226.0 }, { "date": "2016-06-29T00:00:00", "count": 194.0 }, { "date": "2016-06-30T00:00:00", "count": 217.0 }, { "date": "2016-07-01T00:00:00", "count": 182.0 }, { "date": "2016-07-02T00:00:00", "count": 159.0 }, { "date": "2016-07-03T00:00:00", "count": 181.0 }, { "date": "2016-07-04T00:00:00", "count": 188.0 }, { "date": "2016-07-05T00:00:00", "count": 187.0 }, { "date": "2016-07-06T00:00:00", "count": 194.0 }, { "date": "2016-07-07T00:00:00", "count": 198.0 }, { "date": "2016-07-08T00:00:00", "count": 196.0 }, { "date": "2016-07-09T00:00:00", "count": 186.0 }, { "date": "2016-07-10T00:00:00", "count": 193.0 }, { "date": "2016-07-11T00:00:00", "count": 202.0 }, { "date": "2016-07-12T00:00:00", "count": 210.0 }, { "date": "2016-07-13T00:00:00", "count": 202.0 }, { "date": "2016-07-14T00:00:00", "count": 214.0 }, { "date": "2016-07-15T00:00:00", "count": 205.0 }, { "date": "2016-07-16T00:00:00", "count": 177.0 }, { "date": "2016-07-17T00:00:00", "count": 183.0 }, { "date": "2016-07-18T00:00:00", "count": 190.0 }, { "date": "2016-07-19T00:00:00", "count": 190.0 }, { "date": "2016-07-20T00:00:00", "count": 204.0 }, { "date": "2016-07-21T00:00:00", "count": 209.0 }, { "date": "2016-07-22T00:00:00", "count": 207.0 }, { "date": "2016-07-23T00:00:00", "count": 199.0 }]
                }]
        };
    }

    export function getMockTrendsForDomainDataTh2(): any {
        return { "charts": [{ "id": "frownies", "name": "Frownies", "dataPoints": [{ "date": "2016-05-07T00:00:00", "count": 71.0 }, { "date": "2016-05-08T00:00:00", "count": 91.0 }, { "date": "2016-05-09T00:00:00", "count": 58.0 }, { "date": "2016-05-10T00:00:00", "count": 78.0 }, { "date": "2016-05-11T00:00:00", "count": 61.0 }, { "date": "2016-05-12T00:00:00", "count": 65.0 }, { "date": "2016-05-13T00:00:00", "count": 63.0 }, { "date": "2016-05-14T00:00:00", "count": 52.0 }, { "date": "2016-05-15T00:00:00", "count": 94.0 }, { "date": "2016-05-16T00:00:00", "count": 55.0 }, { "date": "2016-05-17T00:00:00", "count": 58.0 }, { "date": "2016-05-18T00:00:00", "count": 75.0 }, { "date": "2016-05-19T00:00:00", "count": 95.0 }, { "date": "2016-05-20T00:00:00", "count": 68.0 }, { "date": "2016-05-21T00:00:00", "count": 70.0 }, { "date": "2016-05-22T00:00:00", "count": 78.0 }, { "date": "2016-05-23T00:00:00", "count": 54.0 }, { "date": "2016-05-24T00:00:00", "count": 70.0 }, { "date": "2016-05-25T00:00:00", "count": 82.0 }, { "date": "2016-05-26T00:00:00", "count": 81.0 }, { "date": "2016-05-27T00:00:00", "count": 66.0 }, { "date": "2016-05-28T00:00:00", "count": 53.0 }, { "date": "2016-05-29T00:00:00", "count": 56.0 }, { "date": "2016-05-30T00:00:00", "count": 69.0 }, { "date": "2016-05-31T00:00:00", "count": 72.0 }, { "date": "2016-06-01T00:00:00", "count": 73.0 }, { "date": "2016-06-02T00:00:00", "count": 83.0 }, { "date": "2016-06-03T00:00:00", "count": 62.0 }, { "date": "2016-06-04T00:00:00", "count": 52.0 }, { "date": "2016-06-05T00:00:00", "count": 64.0 }, { "date": "2016-06-06T00:00:00", "count": 63.0 }, { "date": "2016-06-07T00:00:00", "count": 62.0 }, { "date": "2016-06-08T00:00:00", "count": 70.0 }, { "date": "2016-06-09T00:00:00", "count": 64.0 }, { "date": "2016-06-10T00:00:00", "count": 62.0 }, { "date": "2016-06-11T00:00:00", "count": 69.0 }, { "date": "2016-06-12T00:00:00", "count": 61.0 }, { "date": "2016-06-13T00:00:00", "count": 59.0 }, { "date": "2016-06-14T00:00:00", "count": 58.0 }, { "date": "2016-06-15T00:00:00", "count": 84.0 }, { "date": "2016-06-16T00:00:00", "count": 73.0 }, { "date": "2016-06-17T00:00:00", "count": 87.0 }, { "date": "2016-06-18T00:00:00", "count": 74.0 }, { "date": "2016-06-19T00:00:00", "count": 72.0 }, { "date": "2016-06-20T00:00:00", "count": 58.0 }, { "date": "2016-06-21T00:00:00", "count": 73.0 }, { "date": "2016-06-22T00:00:00", "count": 62.0 }, { "date": "2016-06-23T00:00:00", "count": 69.0 }, { "date": "2016-06-24T00:00:00", "count": 76.0 }, { "date": "2016-06-25T00:00:00", "count": 100.0 }, { "date": "2016-06-26T00:00:00", "count": 73.0 }, { "date": "2016-06-27T00:00:00", "count": 74.0 }, { "date": "2016-06-28T00:00:00", "count": 59.0 }, { "date": "2016-06-29T00:00:00", "count": 67.0 }, { "date": "2016-06-30T00:00:00", "count": 66.0 }, { "date": "2016-07-01T00:00:00", "count": 72.0 }, { "date": "2016-07-02T00:00:00", "count": 71.0 }, { "date": "2016-07-03T00:00:00", "count": 63.0 }, { "date": "2016-07-04T00:00:00", "count": 69.0 }, { "date": "2016-07-05T00:00:00", "count": 78.0 }, { "date": "2016-07-06T00:00:00", "count": 50.0 }, { "date": "2016-07-07T00:00:00", "count": 68.0 }, { "date": "2016-07-08T00:00:00", "count": 47.0 }, { "date": "2016-07-09T00:00:00", "count": 58.0 }, { "date": "2016-07-10T00:00:00", "count": 87.0 }, { "date": "2016-07-11T00:00:00", "count": 63.0 }, { "date": "2016-07-12T00:00:00", "count": 71.0 }, { "date": "2016-07-13T00:00:00", "count": 110.0 }, { "date": "2016-07-14T00:00:00", "count": 87.0 }, { "date": "2016-07-15T00:00:00", "count": 85.0 }, { "date": "2016-07-16T00:00:00", "count": 62.0 }, { "date": "2016-07-17T00:00:00", "count": 78.0 }, { "date": "2016-07-18T00:00:00", "count": 63.0 }, { "date": "2016-07-19T00:00:00", "count": 66.0 }, { "date": "2016-07-20T00:00:00", "count": 58.0 }, { "date": "2016-07-21T00:00:00", "count": 53.0 }, { "date": "2016-07-22T00:00:00", "count": 78.0 }, { "date": "2016-07-23T00:00:00", "count": 71.0 }, { "date": "2016-07-24T00:00:00", "count": 75.0 }, { "date": "2016-07-25T00:00:00", "count": 90.0 }, { "date": "2016-07-26T00:00:00", "count": 77.0 }, { "date": "2016-07-27T00:00:00", "count": 57.0 }, { "date": "2016-07-28T00:00:00", "count": 66.0 }, { "date": "2016-07-29T00:00:00", "count": 67.0 }, { "date": "2016-07-30T00:00:00", "count": 69.0 }, { "date": "2016-07-31T00:00:00", "count": 62.0 }, { "date": "2016-08-01T00:00:00", "count": 64.0 }, { "date": "2016-08-02T00:00:00", "count": 58.0 }, { "date": "2016-08-03T00:00:00", "count": 89.0 }] }, { "id": "crashes", "name": "Crashes", "dataPoints": [] }, { "id": "navigations", "name": "Navigations", "dataPoints": [{ "date": "2016-05-08T00:00:00", "count": 750392.0 }, { "date": "2016-05-09T00:00:00", "count": 834517.0 }, { "date": "2016-05-10T00:00:00", "count": 827558.0 }, { "date": "2016-05-11T00:00:00", "count": 821403.0 }, { "date": "2016-05-12T00:00:00", "count": 817127.0 }, { "date": "2016-05-13T00:00:00", "count": 790873.0 }, { "date": "2016-05-14T00:00:00", "count": 751795.0 }, { "date": "2016-05-15T00:00:00", "count": 772897.0 }, { "date": "2016-05-16T00:00:00", "count": 858371.0 }, { "date": "2016-05-17T00:00:00", "count": 838323.0 }, { "date": "2016-05-18T00:00:00", "count": 855575.0 }, { "date": "2016-05-19T00:00:00", "count": 850122.0 }, { "date": "2016-05-20T00:00:00", "count": 837904.0 }, { "date": "2016-05-21T00:00:00", "count": 782085.0 }, { "date": "2016-05-22T00:00:00", "count": 822026.0 }, { "date": "2016-05-23T00:00:00", "count": 908133.0 }, { "date": "2016-05-24T00:00:00", "count": 902387.0 }, { "date": "2016-05-25T00:00:00", "count": 893624.0 }, { "date": "2016-05-26T00:00:00", "count": 896242.0 }, { "date": "2016-05-27T00:00:00", "count": 862627.0 }, { "date": "2016-05-28T00:00:00", "count": 787878.0 }, { "date": "2016-05-29T00:00:00", "count": 827226.0 }, { "date": "2016-05-30T00:00:00", "count": 918706.0 }, { "date": "2016-05-31T00:00:00", "count": 931637.0 }, { "date": "2016-06-01T00:00:00", "count": 915666.0 }, { "date": "2016-06-02T00:00:00", "count": 941461.0 }, { "date": "2016-06-03T00:00:00", "count": 902860.0 }, { "date": "2016-06-04T00:00:00", "count": 838356.0 }, { "date": "2016-06-05T00:00:00", "count": 873716.0 }, { "date": "2016-06-06T00:00:00", "count": 981295.0 }, { "date": "2016-06-07T00:00:00", "count": 966083.0 }, { "date": "2016-06-08T00:00:00", "count": 958273.0 }, { "date": "2016-06-09T00:00:00", "count": 959809.0 }, { "date": "2016-06-10T00:00:00", "count": 926020.0 }, { "date": "2016-06-11T00:00:00", "count": 858233.0 }, { "date": "2016-06-12T00:00:00", "count": 914874.0 }, { "date": "2016-06-13T00:00:00", "count": 1009030.0 }, { "date": "2016-06-14T00:00:00", "count": 1004111.0 }, { "date": "2016-06-15T00:00:00", "count": 998712.0 }, { "date": "2016-06-16T00:00:00", "count": 983811.0 }, { "date": "2016-06-17T00:00:00", "count": 937116.0 }, { "date": "2016-06-18T00:00:00", "count": 855178.0 }, { "date": "2016-06-19T00:00:00", "count": 888791.0 }, { "date": "2016-06-20T00:00:00", "count": 1006194.0 }, { "date": "2016-06-21T00:00:00", "count": 980932.0 }, { "date": "2016-06-22T00:00:00", "count": 983959.0 }, { "date": "2016-06-23T00:00:00", "count": 944852.0 }, { "date": "2016-06-24T00:00:00", "count": 945449.0 }, { "date": "2016-06-25T00:00:00", "count": 846748.0 }, { "date": "2016-06-26T00:00:00", "count": 905778.0 }, { "date": "2016-06-27T00:00:00", "count": 1007194.0 }, { "date": "2016-06-28T00:00:00", "count": 981534.0 }, { "date": "2016-06-29T00:00:00", "count": 969262.0 }, { "date": "2016-06-30T00:00:00", "count": 957262.0 }, { "date": "2016-07-01T00:00:00", "count": 924990.0 }, { "date": "2016-07-02T00:00:00", "count": 848849.0 }, { "date": "2016-07-03T00:00:00", "count": 861898.0 }, { "date": "2016-07-04T00:00:00", "count": 938055.0 }, { "date": "2016-07-05T00:00:00", "count": 972791.0 }, { "date": "2016-07-06T00:00:00", "count": 945038.0 }, { "date": "2016-07-07T00:00:00", "count": 939630.0 }, { "date": "2016-07-08T00:00:00", "count": 932081.0 }, { "date": "2016-07-09T00:00:00", "count": 845991.0 }, { "date": "2016-07-10T00:00:00", "count": 865465.0 }, { "date": "2016-07-11T00:00:00", "count": 986302.0 }, { "date": "2016-07-12T00:00:00", "count": 968787.0 }, { "date": "2016-07-13T00:00:00", "count": 978493.0 }, { "date": "2016-07-14T00:00:00", "count": 956623.0 }, { "date": "2016-07-15T00:00:00", "count": 933791.0 }, { "date": "2016-07-16T00:00:00", "count": 850316.0 }, { "date": "2016-07-17T00:00:00", "count": 864830.0 }, { "date": "2016-07-18T00:00:00", "count": 972787.0 }, { "date": "2016-07-19T00:00:00", "count": 950515.0 }, { "date": "2016-07-20T00:00:00", "count": 950043.0 }, { "date": "2016-07-21T00:00:00", "count": 951846.0 }, { "date": "2016-07-22T00:00:00", "count": 932229.0 }, { "date": "2016-07-23T00:00:00", "count": 864520.0 }, { "date": "2016-07-24T00:00:00", "count": 878333.0 }, { "date": "2016-07-25T00:00:00", "count": 1001454.0 }, { "date": "2016-07-26T00:00:00", "count": 986005.0 }, { "date": "2016-07-27T00:00:00", "count": 978752.0 }, { "date": "2016-07-28T00:00:00", "count": 963518.0 }, { "date": "2016-07-29T00:00:00", "count": 937216.0 }, { "date": "2016-07-30T00:00:00", "count": 851797.0 }, { "date": "2016-07-31T00:00:00", "count": 878395.0 }, { "date": "2016-08-01T00:00:00", "count": 994726.0 }, { "date": "2016-08-02T00:00:00", "count": 980270.0 }, { "date": "2016-08-03T00:00:00", "count": 957204.0 }] }, { "id": "focus-time", "name": "Focus Time (hours)", "dataPoints": [{ "date": "2016-05-05T00:00:00", "count": 31.0 }, { "date": "2016-05-06T00:00:00", "count": 32.0 }, { "date": "2016-05-07T00:00:00", "count": 28.0 }, { "date": "2016-05-08T00:00:00", "count": 34.0 }, { "date": "2016-05-09T00:00:00", "count": 30.0 }, { "date": "2016-05-10T00:00:00", "count": 32.0 }, { "date": "2016-05-11T00:00:00", "count": 40.0 }, { "date": "2016-05-12T00:00:00", "count": 34.0 }, { "date": "2016-05-13T00:00:00", "count": 30.0 }, { "date": "2016-05-14T00:00:00", "count": 35.0 }, { "date": "2016-05-15T00:00:00", "count": 31.0 }, { "date": "2016-05-16T00:00:00", "count": 34.0 }, { "date": "2016-05-17T00:00:00", "count": 30.0 }, { "date": "2016-05-18T00:00:00", "count": 25.0 }, { "date": "2016-05-19T00:00:00", "count": 25.0 }, { "date": "2016-05-20T00:00:00", "count": 29.0 }, { "date": "2016-05-21T00:00:00", "count": 22.0 }, { "date": "2016-05-22T00:00:00", "count": 33.0 }, { "date": "2016-05-23T00:00:00", "count": 25.0 }, { "date": "2016-05-24T00:00:00", "count": 29.0 }, { "date": "2016-05-25T00:00:00", "count": 29.0 }, { "date": "2016-05-26T00:00:00", "count": 24.0 }, { "date": "2016-05-27T00:00:00", "count": 25.0 }, { "date": "2016-05-28T00:00:00", "count": 23.0 }, { "date": "2016-05-29T00:00:00", "count": 24.0 }, { "date": "2016-05-30T00:00:00", "count": 25.0 }, { "date": "2016-05-31T00:00:00", "count": 30.0 }, { "date": "2016-06-01T00:00:00", "count": 22.0 }, { "date": "2016-06-02T00:00:00", "count": 27.0 }, { "date": "2016-06-03T00:00:00", "count": 23.0 }, { "date": "2016-06-04T00:00:00", "count": 30.0 }, { "date": "2016-06-05T00:00:00", "count": 26.0 }, { "date": "2016-06-06T00:00:00", "count": 25.0 }, { "date": "2016-06-07T00:00:00", "count": 26.0 }, { "date": "2016-06-08T00:00:00", "count": 23.0 }, { "date": "2016-06-09T00:00:00", "count": 20.0 }, { "date": "2016-06-10T00:00:00", "count": 19.0 }, { "date": "2016-06-11T00:00:00", "count": 25.0 }, { "date": "2016-06-12T00:00:00", "count": 25.0 }, { "date": "2016-06-13T00:00:00", "count": 19.0 }, { "date": "2016-06-14T00:00:00", "count": 24.0 }, { "date": "2016-06-15T00:00:00", "count": 20.0 }, { "date": "2016-06-16T00:00:00", "count": 25.0 }, { "date": "2016-06-17T00:00:00", "count": 21.0 }, { "date": "2016-06-18T00:00:00", "count": 25.0 }, { "date": "2016-06-19T00:00:00", "count": 23.0 }, { "date": "2016-06-20T00:00:00", "count": 25.0 }, { "date": "2016-06-21T00:00:00", "count": 23.0 }, { "date": "2016-06-22T00:00:00", "count": 25.0 }, { "date": "2016-06-23T00:00:00", "count": 22.0 }, { "date": "2016-06-24T00:00:00", "count": 29.0 }, { "date": "2016-06-25T00:00:00", "count": 23.0 }, { "date": "2016-06-26T00:00:00", "count": 21.0 }, { "date": "2016-06-27T00:00:00", "count": 25.0 }, { "date": "2016-06-28T00:00:00", "count": 21.0 }, { "date": "2016-06-29T00:00:00", "count": 22.0 }, { "date": "2016-06-30T00:00:00", "count": 21.0 }, { "date": "2016-07-01T00:00:00", "count": 20.0 }, { "date": "2016-07-02T00:00:00", "count": 24.0 }, { "date": "2016-07-03T00:00:00", "count": 28.0 }, { "date": "2016-07-04T00:00:00", "count": 22.0 }, { "date": "2016-07-05T00:00:00", "count": 26.0 }, { "date": "2016-07-06T00:00:00", "count": 28.0 }, { "date": "2016-07-07T00:00:00", "count": 24.0 }, { "date": "2016-07-08T00:00:00", "count": 25.0 }, { "date": "2016-07-09T00:00:00", "count": 22.0 }, { "date": "2016-07-10T00:00:00", "count": 24.0 }, { "date": "2016-07-11T00:00:00", "count": 26.0 }, { "date": "2016-07-12T00:00:00", "count": 25.0 }, { "date": "2016-07-13T00:00:00", "count": 27.0 }, { "date": "2016-07-14T00:00:00", "count": 25.0 }, { "date": "2016-07-15T00:00:00", "count": 24.0 }, { "date": "2016-07-16T00:00:00", "count": 22.0 }, { "date": "2016-07-17T00:00:00", "count": 26.0 }, { "date": "2016-07-18T00:00:00", "count": 22.0 }, { "date": "2016-07-19T00:00:00", "count": 23.0 }, { "date": "2016-07-20T00:00:00", "count": 22.0 }, { "date": "2016-07-21T00:00:00", "count": 26.0 }, { "date": "2016-07-22T00:00:00", "count": 24.0 }, { "date": "2016-07-23T00:00:00", "count": 17.0 }, { "date": "2016-07-24T00:00:00", "count": 17.0 }, { "date": "2016-07-25T00:00:00", "count": 17.0 }, { "date": "2016-07-26T00:00:00", "count": 19.0 }, { "date": "2016-07-27T00:00:00", "count": 19.0 }, { "date": "2016-07-27T00:00:00", "count": 0.0 }, { "date": "2016-07-28T00:00:00", "count": 18.0 }, { "date": "2016-07-29T00:00:00", "count": 17.0 }, { "date": "2016-07-30T00:00:00", "count": 0.0 }, { "date": "2016-07-30T00:00:00", "count": 28.0 }, { "date": "2016-07-31T00:00:00", "count": 0.0 }, { "date": "2016-07-31T00:00:00", "count": 19.0 }] }] };
    }
}