<template>
  <section class="baseform04">
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
          <span class="item-label">MS</span>
          <span class="item-input sch">
            <b-input />
            <b-button 
              type="is-dark"
              icon-left="magnify"
            />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">Charge(KG)</span>
          <span class="item-input">
            <b-select>
              <option>All</option>
            </b-select>
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">Intensity</span>
          <span class="item-input sch">
            <b-select>
              <option>All</option>
            </b-select>
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">Loss 포함</span>
          <span class="item-input sch">
            <b-checkbox />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">Tar Intensity</span>
          <span class="item-input">
            <b-input />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">관리선</span>
          <span class="item-input">
            <b-input />
          </span>
        </li>
        <li class="option-item">
          <span class="item-label">Time</span>
          <span class="item-input">
            <b-input />
          </span>
        </li>
      </ul>
    </component-panel>
    <section class="grid-btn-wrap">
      <component-panel 
        class="grid-wrap add-grid-desc"
      >
        <sk-grid
          ref="lotListGrid"
          :items-source="lotList"
          :initialized="initLotGrid"
          :use-checkbox="true"
          :columns="lotListColumns"
          @selection-changed="selectionChanged"
        />
        <span class="grid-desc">100건 조회 되었습니다.</span>
      </component-panel>
      <component-panel 
        class="btn-grid"
        :use-header="false"
      >
        <div class="btn-wrap">
          <b-button 
            type="is-dark"
          >
            Intensity/Neck Time <br /> Trend(Multi)
          </b-button>
          <b-button 
            type="is-dark"
          >
            Melt Temp/Neck <br /> Time Trend
          </b-button>
          <b-button 
            type="is-dark"
          >
            Target <br /> Intensity 계산
          </b-button>
          <b-button 
            type="is-dark"
          >
            1/2차 Target Melt <br /> Temp 계산
          </b-button>
          <b-button 
            type="is-dark"
          >
            기간별 <br /> Histo.
          </b-button>
          <b-button 
            type="is-dark"
          >
            장비별 <br /> Histo.
          </b-button>
          <b-button 
            type="is-dark"
          >
            기간/장비 <br /> 산정도
          </b-button>
        </div>
      </component-panel>
    </section>
    <section class="chart-grid-wrap">
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
  </section>
</template>
<script src="./BaseForm04.script.js" />
<style src="./BaseForm04.scss" lang="scss" />
