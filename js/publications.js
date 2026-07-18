(function () {
    'use strict';

    const TOPIC_KEYWORDS = {
        ai: [
            'machine learning', 'artificial intelligence', 'deep neural', 'neural network',
            'data driven', 'data-driven', 'digital twin', 'inverse design',
            'intelligent design', 'topology optimization', 'optimization framework'
        ],
        printing: [
            'additive manufacturing', '3d print', '3-d print', '4d print', '4-d print',
            'printing', 'extrusion', 'digital light processing'
        ],
        materials: [
            'metamaterial', 'metastructure', 'auxetic', 'negative poisson', 'lattice',
            'honeycomb', 'liquid crystal elastomer', 'shape memory', 'programmable material',
            'smart material', 'composite foam'
        ],
        robotics: [
            'soft robot', 'robotic', 'robot ', 'robots', 'gripper', 'origami',
            'unmanned aerial', 'uav', 'gecko', 'bioinspired', 'bio-inspired'
        ],
        energy: [
            'energy harvest', 'energy absorption', 'energy dissip', 'vibration',
            'piezoelectric', 'renewable energy', 'charging', 'impact protection'
        ]
    };

    document.addEventListener('DOMContentLoaded', initPublications);

    function initPublications() {
        const list = document.getElementById('publicationList');
        const searchInput = document.getElementById('publicationSearch');
        const yearFilter = document.getElementById('yearFilter');
        const topicFilter = document.getElementById('topicFilter');
        const clearButton = document.getElementById('clearPublicationFilters');
        const filterForm = document.getElementById('publicationFilters');
        const resultSummary = document.getElementById('publicationResultSummary');
        const noResults = document.getElementById('publicationNoResults');
        const totalLabel = document.getElementById('publicationTotal');

        if (!list || !searchInput || !yearFilter || !topicFilter || !clearButton || !filterForm) {
            return;
        }

        const items = preparePublicationItems(list);
        const yearHeadings = Array.from(list.querySelectorAll('.category'));

        populateYearFilter(yearFilter, items);
        renderSelectedPublications(items);
        setupPublicationDialog(list);

        const years = items.map(function (item) { return Number(item.dataset.year); })
            .filter(function (year) { return Number.isFinite(year); });
        const oldestYear = years.length ? Math.min.apply(null, years) : '';
        const newestYear = years.length ? Math.max.apply(null, years) : '';

        if (totalLabel) {
            const yearRange = oldestYear && newestYear ? ' · ' + oldestYear + '–' + newestYear : '';
            totalLabel.textContent = items.length + ' publications' + yearRange;
        }

        function applyFilters() {
            const queryTokens = normalizeText(searchInput.value).split(' ').filter(Boolean);
            const selectedYear = yearFilter.value;
            const selectedTopic = topicFilter.value;
            let visibleCount = 0;

            items.forEach(function (item) {
                const matchesQuery = queryTokens.every(function (token) {
                    return item.dataset.searchText.includes(token);
                });
                const matchesYear = selectedYear === 'all' || item.dataset.year === selectedYear;
                const itemTopics = item.dataset.topics ? item.dataset.topics.split(' ') : [];
                const matchesTopic = selectedTopic === 'all' || itemTopics.includes(selectedTopic);
                const isVisible = matchesQuery && matchesYear && matchesTopic;

                item.hidden = !isVisible;
                if (isVisible) {
                    visibleCount += 1;
                }
            });

            yearHeadings.forEach(function (heading) {
                const year = normalizeText(heading.textContent);
                const hasVisibleItem = items.some(function (item) {
                    return !item.hidden && item.dataset.year === year;
                });
                heading.hidden = !hasVisibleItem;
            });

            if (noResults) {
                noResults.hidden = visibleCount !== 0;
            }

            if (resultSummary) {
                resultSummary.textContent = 'Showing ' + visibleCount + ' of ' + items.length + ' publications.';
            }

            const filtersAreActive = Boolean(searchInput.value.trim()) || selectedYear !== 'all' || selectedTopic !== 'all';
            clearButton.disabled = !filtersAreActive;
        }

        function clearFilters(options) {
            searchInput.value = '';
            yearFilter.value = 'all';
            topicFilter.value = 'all';
            applyFilters();

            if (!options || options.focus !== false) {
                searchInput.focus();
            }
        }

        searchInput.addEventListener('input', applyFilters);
        yearFilter.addEventListener('change', applyFilters);
        topicFilter.addEventListener('change', applyFilters);
        clearButton.addEventListener('click', function () { clearFilters(); });
        filterForm.addEventListener('submit', function (event) {
            event.preventDefault();
            applyFilters();
        });

        const inlineClear = noResults ? noResults.querySelector('[data-clear-publication-filters]') : null;
        if (inlineClear) {
            inlineClear.addEventListener('click', function () { clearFilters(); });
        }

        applyFilters();
    }

    function preparePublicationItems(list) {
        const items = [];
        let currentYear = '';

        Array.from(list.children).forEach(function (child) {
            if (child.classList.contains('category')) {
                currentYear = normalizeText(child.textContent);
                return;
            }

            if (!child.classList.contains('item')) {
                return;
            }

            const titleElement = child.querySelector('h3');
            const authorsElement = child.querySelector('.authors');
            const journalElement = child.querySelector('.journal');
            const title = cleanVisibleText(titleElement);
            const authors = cleanVisibleText(authorsElement);
            const journal = cleanVisibleText(journalElement);
            const searchText = normalizeText([title, authors, journal].join(' '));
            const topics = detectTopics(searchText);

            child.id = child.id || 'publication-' + (items.length + 1);
            child.dataset.year = currentYear;
            child.dataset.searchText = searchText;
            child.dataset.topics = topics.join(' ');

            enhancePublicationActions(child, title);
            items.push(child);
        });

        return items;
    }

    function detectTopics(searchText) {
        const matches = Object.keys(TOPIC_KEYWORDS).filter(function (topic) {
            return TOPIC_KEYWORDS[topic].some(function (keyword) {
                return searchText.includes(normalizeText(keyword));
            });
        });

        return matches.length ? matches : ['other'];
    }

    function enhancePublicationActions(item, title) {
        const actions = item.querySelector('.actions');
        if (!actions) {
            return;
        }

        Array.from(actions.querySelectorAll('a, button')).forEach(function (control) {
            const isDialogAction = control.classList.contains('cite-btn') || control.classList.contains('abstract-btn');

            if (isDialogAction) {
                const isCitation = control.classList.contains('cite-btn');
                const button = control.tagName === 'BUTTON' ? control : document.createElement('button');
                button.type = 'button';
                button.className = control.className;
                button.dataset.content = control.getAttribute('data-content') || '';
                button.dataset.dialogType = isCitation ? 'citation' : 'abstract';
                button.textContent = isCitation ? 'Cite' : 'Abstract';
                button.setAttribute('aria-haspopup', 'dialog');
                button.setAttribute('aria-label', (isCitation ? 'Cite: ' : 'Read abstract: ') + title);
                if (control !== button) {
                    control.replaceWith(button);
                }
                return;
            }

            if (control.tagName === 'A') {
                upgradeExternalLink(control, title);
            }
        });
    }

    function upgradeExternalLink(link, title) {
        let url;

        try {
            url = new URL(link.getAttribute('href'), window.location.href);
        } catch (error) {
            return;
        }

        if (url.protocol === 'http:' && url.hostname.toLowerCase() === 'liuchao-jin.github.io') {
            url.protocol = 'https:';
            link.href = url.toString();
        }

        const href = url.href.toLowerCase();
        const isDoi = url.hostname.toLowerCase().includes('doi.org');
        const isPdf = href.endsWith('.pdf') || href.includes('.pdf?');
        const label = isDoi ? 'DOI' : (isPdf ? 'PDF' : 'Publisher');

        link.textContent = label + ' ↗';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', 'Open ' + label + ' for “' + title + '” in a new tab');
    }

    function populateYearFilter(select, items) {
        const years = Array.from(new Set(items.map(function (item) {
            return item.dataset.year;
        }).filter(Boolean))).sort(function (a, b) {
            return Number(b) - Number(a);
        });

        years.forEach(function (year) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            select.appendChild(option);
        });
    }

    function renderSelectedPublications(items) {
        const container = document.getElementById('selectedPublicationList');
        const section = container ? container.closest('.selected-publications') : null;
        if (!container || !section) {
            return;
        }

        const explicitlySelected = items.filter(function (item) {
            return item.dataset.selected === 'true';
        });
        const selectedItems = (explicitlySelected.length ? explicitlySelected : items.slice(0, 4)).slice(0, 6);

        container.replaceChildren();

        selectedItems.forEach(function (item, selectedIndex) {
            const card = document.createElement('article');
            const meta = document.createElement('div');
            const number = document.createElement('span');
            const year = document.createElement('span');
            const heading = document.createElement('h3');
            const journal = document.createElement('p');
            const actionList = document.createElement('div');
            const sourceTitle = item.querySelector('h3');
            const sourceJournal = item.querySelector('.journal');
            const sourceLinks = Array.from(item.querySelectorAll('.actions a')).slice(0, 2);

            card.className = 'selected-card';
            meta.className = 'selected-meta';
            number.className = 'selected-number';
            year.className = 'selected-year';
            journal.className = 'selected-journal';
            actionList.className = 'selected-actions';

            number.textContent = 'Selected ' + String(selectedIndex + 1).padStart(2, '0');
            year.textContent = item.dataset.year;
            heading.textContent = cleanVisibleText(sourceTitle);
            journal.textContent = cleanVisibleText(sourceJournal);

            sourceLinks.forEach(function (sourceLink) {
                const link = document.createElement('a');
                link.href = sourceLink.href;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = sourceLink.textContent;
                link.setAttribute('aria-label', sourceLink.getAttribute('aria-label') || sourceLink.textContent);
                actionList.appendChild(link);
            });

            meta.append(number, year);
            card.append(meta, heading, journal, actionList);
            container.appendChild(card);
        });

        section.hidden = selectedItems.length === 0;
    }

    function setupPublicationDialog(list) {
        const dialog = document.getElementById('publicationDialog');
        const title = document.getElementById('publicationDialogTitle');
        const eyebrow = document.getElementById('publicationDialogEyebrow');
        const body = document.getElementById('publicationDialogDescription');
        const copyButton = document.getElementById('copyPublicationContent');
        const feedback = document.getElementById('publicationCopyFeedback');

        if (!dialog || !title || !body || !copyButton || !feedback) {
            return;
        }

        let lastTrigger = null;
        let copyText = '';
        let resetTimer = null;

        list.addEventListener('click', function (event) {
            const trigger = event.target.closest('.cite-btn, .abstract-btn');
            if (!trigger || !list.contains(trigger)) {
                return;
            }

            const isCitation = trigger.dataset.dialogType === 'citation';
            const rawContent = trigger.dataset.content || '';
            copyText = isCitation ? stripPreWrapper(rawContent) : rawContent.trim();
            lastTrigger = trigger;

            title.textContent = isCitation ? 'BibTeX citation' : 'Abstract';
            if (eyebrow) {
                eyebrow.textContent = isCitation ? 'Ready to copy' : 'Publication details';
            }

            body.replaceChildren();
            const contentElement = document.createElement(isCitation ? 'pre' : 'p');
            contentElement.textContent = copyText || 'No content is available for this publication.';
            body.appendChild(contentElement);

            feedback.textContent = '';
            feedback.classList.remove('is-error');
            resetCopyButton(copyButton, isCitation);
            window.clearTimeout(resetTimer);
            openDialog(dialog);

            window.requestAnimationFrame(function () {
                const closeButton = dialog.querySelector('[data-dialog-close]');
                if (closeButton) {
                    closeButton.focus();
                }
            });
        });

        dialog.querySelectorAll('[data-dialog-close]').forEach(function (button) {
            button.addEventListener('click', function () {
                closeDialog(dialog);
            });
        });

        dialog.addEventListener('click', function (event) {
            if (event.target === dialog) {
                closeDialog(dialog);
            }
        });

        dialog.addEventListener('close', restoreFocus);
        dialog.addEventListener('cancel', function () {
            window.setTimeout(restoreFocus, 0);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && dialog.classList.contains('fallback-open')) {
                event.preventDefault();
                closeDialog(dialog);
            }
        });

        copyButton.addEventListener('click', async function () {
            if (!copyText) {
                feedback.textContent = 'Nothing is available to copy.';
                feedback.classList.add('is-error');
                return;
            }

            try {
                await copyToClipboard(copyText);
                copyButton.textContent = 'Copied ✓';
                feedback.textContent = 'Copied to your clipboard.';
                feedback.classList.remove('is-error');
                resetTimer = window.setTimeout(function () {
                    resetCopyButton(copyButton, title.textContent.includes('BibTeX'));
                }, 2400);
            } catch (error) {
                copyButton.textContent = 'Try again';
                feedback.textContent = 'Copy failed. Select the text above and copy it manually.';
                feedback.classList.add('is-error');
            }
        });

        function restoreFocus() {
            document.body.classList.remove('publication-dialog-open');
            dialog.classList.remove('fallback-open');
            if (lastTrigger && document.contains(lastTrigger)) {
                lastTrigger.focus();
            }
        }
    }

    function openDialog(dialog) {
        document.body.classList.add('publication-dialog-open');

        if (typeof dialog.showModal === 'function') {
            if (!dialog.open) {
                dialog.showModal();
            }
            return;
        }

        dialog.setAttribute('open', '');
        dialog.classList.add('fallback-open');
    }

    function closeDialog(dialog) {
        if (typeof dialog.close === 'function' && dialog.open) {
            dialog.close();
            return;
        }

        dialog.removeAttribute('open');
        dialog.classList.remove('fallback-open');
        document.body.classList.remove('publication-dialog-open');
        dialog.dispatchEvent(new Event('close'));
    }

    function resetCopyButton(button, isCitation) {
        button.textContent = isCitation ? 'Copy BibTeX' : 'Copy abstract';
    }

    async function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return;
            } catch (error) {
                // Continue to the local selection fallback below.
            }
        }

        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.inset = '-9999px auto auto -9999px';
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);

        let succeeded = false;
        try {
            succeeded = document.execCommand('copy');
        } finally {
            textarea.remove();
        }

        if (!succeeded) {
            throw new Error('Clipboard copy was not available.');
        }
    }

    function stripPreWrapper(value) {
        return value
            .replace(/^\s*<pre[^>]*>\s*/i, '')
            .replace(/\s*<\/pre>\s*$/i, '')
            .trim();
    }

    function cleanVisibleText(element) {
        return element ? element.textContent.replace(/\s+/g, ' ').trim() : '';
    }

    function normalizeText(value) {
        return String(value || '')
            .normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[–—]/g, '-')
            .replace(/\s+/g, ' ')
            .trim();
    }
}());
