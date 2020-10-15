<template>
  <section class="baseform05">
    <component-panel
      class="lot-search"
      :use-header="false"
    >
      <ul class="search-options">
        <li class="option-item">
          <span class="item-label">조회 기간</span>
          <span class="item-input">
            <b-datepicker
              placeholder="from"
              icon="calendar-today"
              v-model="from"
              editable
            />
            <span class="unit">~</span>
            <b-datepicker
              placeholder="to"
              icon="calendar-today"
              v-model="to"
              editable
            />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">장비</span>
          <span class="item-input">
            <b-select>
              <option>선택</option>
            </b-select>
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">평균값</span>
          <span class="item-input sch">
            <b-select>
              <option>선택</option>
            </b-select>
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">초반제외</span>
          <span class="item-input">
            <b-input />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">기준값</span>
          <span class="item-input">
            <b-input />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">Length</span>
          <span class="item-input sm-input">
            <b-input />
            <span class="unit">/</span>
            <b-input />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">Melt Gap</span>
          <span class="item-input sm-input">
            <b-input />
            <span class="unit">/</span>
            <b-input />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">Normalization</span>
          <span class="item-input sm-input">
            <b-input />
            <span class="unit">/</span>
            <b-input />
          </span>
        </li>
      </ul>
    </component-panel>
    <component-panel
      class="tab-grid-wrap add-grid-desc"
    >
      <b-tabs>
        <b-tab-item label="Melt Gap 정리">
          <div class="grid-wrap">
            <sk-grid
              ref="lotListGrid"
              style="width: 100%"
              :items-source="lotList"
              :initialized="initLotGrid"
              :use-checkbox="true"
              :columns="lotListColumns"
              @selection-changed="selectionChanged"
            />
            <span class="grid-desc">96건 조회 되었습니다.</span>
          </div>
          <div class="grid-wrap">
            <sk-grid
              ref="lotListGrid"
              style="width: 100%"
              :items-source="lotList"
              :initialized="initLotGrid"
              :use-checkbox="true"
              :columns="lotListColumns"
              @selection-changed="selectionChanged"
            />
            <span class="grid-desc">97건 조회 되었습니다.</span>
          </div>
        </b-tab-item>
        <b-tab-item label="Normalization">
          <div class="grid-wrap">
            <sk-grid
              ref="lotListGrid"
              style="width: 100%"
              :items-source="lotList"
              :initialized="initLotGrid"
              :use-checkbox="true"
              :columns="lotListColumns"
              @selection-changed="selectionChanged"
            />
            <span class="grid-desc">99건 조회 되었습니다.</span>
          </div>
          <div class="grid-wrap">
            <sk-grid
              ref="lotListGrid"
              style="width: 100%"
              :items-source="lotList"
              :initialized="initLotGrid"
              :use-checkbox="true"
              :columns="lotListColumns"
              @selection-changed="selectionChanged"
            />
            <span class="grid-desc">100건 조회 되었습니다.</span>
          </div>
        </b-tab-item>
      </b-tabs>
    </component-panel>
    <component-panel
      class="chart-grid"
    >
      <template slot="header">
        <div class="header-buttons">
          <b-button
            type="is-primary"
            icon-left="content-save"
          />
          <b-button
            type="is-dark"
            icon-left="magnify"
          />
          <span class="divider" />
          <b-button
            type="is-dark"
            icon-left="import"
          />
          <b-button
            type="is-dark"
            icon-left="export"
          />
        </div>
      </template>
      <div class="chart-area">
        <sk-chart
          :items-source="chartData"
          binding-x-type="NUMBER"
          binding-x="order"
          chart-type="Line"
        >
          <wj-flex-chart-series
            binding="value"
            name="SeriesName"
          />
        </sk-chart>
      </div>
    </component-panel>
  </section>
</template>
<script src="./BaseForm05.script.js" />
<style src="./BaseForm05.scss" lang="scss" />
