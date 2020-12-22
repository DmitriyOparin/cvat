// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

/// <reference types="cypress" />

import { taskName, labelName } from '../../support/const';

context('Dump and upload annotations', () => {
    const caseId = 'X'; // TODO
    const rectangleShape2Points = {
        points: 'By 2 Points',
        type: 'Shape',
        labelName: labelName,
        firstX: 400,
        firstY: 100,
        secondX: 450,
        secondY: 150,
    };
    const path = require('path');

    before(() => {
        cy.openTaskJob(taskName);

        // create object
        cy.createRectangle(rectangleShape2Points);
    });

    describe(`Testing case "${caseId}"`, () => {
        it('Dump and upload', () => {
            // download
            cy.contains('.cvat-annotation-header-button', 'Menu').trigger('mouseover');
            cy.get('.cvat-annotation-menu')
                .should('be.visible')
                .within(() => {
                    cy.contains('Dump annotations').trigger('mouseover');
                });
            cy.contains('.cvat-menu-dump-submenu-item', 'CVAT for images 1.1').click();
            cy.wait(10000); // TODO

            // clear
            cy.removeAnnotations();
            cy.get('body').trigger('mouseover').click();

            // upload
            cy.contains('.cvat-annotation-header-button', 'Menu').trigger('mouseover');
            cy.get('.cvat-annotation-menu')
                .should('be.visible')
                .within(() => {
                    cy.contains('Upload annotations').should('be.visible').trigger('mouseover');
                });
            const fileName = 'task_new annotation task for main task-2020_12_22_12_15_13-cvat for images 1.1.zip';
            cy.get('.cvat-menu-load-submenu-item:nth-child(3)') // CVAT 1.1
                .should('be.visible')
                .trigger('mouseover')
                .within(() => {
                    cy.get('input[type="file"]')
                        // .click({ force: true })
                        .attachFile(fileName, { force: true });
                });
        });
    });
});
