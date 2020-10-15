<template>
  <section class="baseform06">
    <component-panel 
      class="search-grid add-grid-desc"
      title="Lot List"  
    >
      <div class="cond-wrap">
        <ul>
          <li class="item-list">
            <span class="item-label">검색조건</span>
            <span class="item-input">
              <b-radio name="radio">All</b-radio>
              <b-radio name="radio">Ingot</b-radio>
            </span>
          </li>
          <li class="item-list">
            <span class="item-label">Line 구분</span>
            <span class="item-input">
              <b-radio name="radio2">All</b-radio>
              <b-radio name="radio2">Line A</b-radio>
              <b-radio name="radio2">Line B</b-radio>
            </span>
          </li>
        </ul>
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
        <span class="grid-desc">99건 조회 되었습니다.</span>
      </div>
      <div class="icon-area">
        <ul>
           <li>
            <b-icon 
              icon="lock"
            />
            <span class="icon-label">Normal 자재</span>
          </li>
          <li>
            <b-icon 
              icon="lock"
            />
            <span class="icon-label">Ingot Diameter</span>
          </li>
          <li>
            <b-icon 
              icon="lock"
            />
            <span class="icon-label">APC 자재</span>
          </li>
          <li>
            <b-icon 
              icon="lock"
            />
            <span class="icon-label">Prime S/E Pos</span>
          </li>
          <li class="complete">
            <b-icon 
              icon="check"
            />
            <span class="icon-label">완료</span>
          </li>
          <li>
            <b-icon 
              icon="lock"
            />
            <span class="icon-label">Sample Pos</span>
          </li>
          <li class="critical">
            <b-icon 
              icon="alarm-light"
            />
            <span class="icon-label">긴급 Lot</span>
          </li>
          <li class="hold">
            <b-icon 
              icon="lock"
            />
            <span class="icon-label">Hold Lot</span>
          </li>
        </ul>
      </div>
    </component-panel>
    <section class="result-grid">
      <component-panel 
        class="lot-search"
        :use-header="false"
      >
        <ul class="search-options">
          <li class="option-item">
            <span class="item-label">Lot Number</span>
            <span class="item-input">
              <b-input />
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">MS Code</span>
            <span class="item-input">
              <b-input />
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">Grower</span>
            <span class="item-input">
              <b-input />
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">Charge</span>
            <span class="item-input">
              <b-input />
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">수량(Cm)</span>
            <span class="item-input">
              <b-input />
            </span>
          </li>
          <li class="option-item">
            <span class="item-label">작업자</span>
            <span class="item-input">
              <b-input />
            </span>
          </li>
        </ul>
      </component-panel>
      <component-panel 
      class="chart-grid"
      >
        <template slot="header">
          <div class="header-buttons">
            <span class="item-label">Chart Min/Max :</span>
            <span class="item-input">
              <b-input />
              <span class="unit">/</span>
              <b-input />
            </span>
            <span class="divider" />
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
        class="grid-input-wrap"
      >
        <template slot="header">
          <div class="header-buttons">
            <b-checkbox>APC -> Normal Conversion</b-checkbox>
            <span class="item-input">
              <b-input />
              <b-button
                type="is-dark"
                size="small"
              >APC -> Normal</b-button>
              <b-input />
            </span>
            <span class="divider" />
            <b-button
              type="is-primary"
              icon-left="check"
            >
              Grower Profile 확인
            </b-button>
          </div>
        </template>
        <div class="grid-input">
          <span class="grid-title">
            <b-checkbox>Ingot Diameter</b-checkbox>
          </span>
          <ul class="input-list">
            <li>
              <span class="item-label">[Target DIA]</span>
              <span class="item-input"><b-input /></span>
            </li>
            <li>
              <span class="item-label">[Target UCL]</span>
              <span class="item-input"><b-input /></span>
            </li>
            <li>
              <span class="item-label">[Target LCL]</span>
              <span class="item-input"><b-input /></span>
            </li>
            <li>
              <span class="item-label">[축정간격]</span>
              <span class="item-input sm">
                <b-input />
                <span class="unit">mm</span>
              </span>
            </li>
          </ul>
          <component-panel 
            class="grid-wrap add-grid-desc"
          >
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
          </component-panel>
        </div>
      </component-panel>
    </section>
  </section>
</template>
<script src="./BaseForm06.script.js" />
<style src="./BaseForm06.scss" lang="scss" />
